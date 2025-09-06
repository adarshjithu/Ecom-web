import React, { useState, useEffect, useRef, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ArrowLeft, X, Home, Briefcase, MapPin, Map, Search, Navigation } from "lucide-react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';
import Select from 'react-select';
import { GOOGLE_MAPS_API_KEY } from "@/config/maps";
import { useDispatch, useSelector } from "react-redux";
import { addAddressRequest, updateAddressRequest } from "@/store/actions";
import { useLocation } from "../../../context/LocationContext";

const DEFAULT_POSITION = { lat: 25.1843, lng: 55.2604 }; // Dubai coordinates

// Cookie utility functions
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const setCookie = (name, value, days = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${JSON.stringify(value)};expires=${expires.toUTCString()};path=/`;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// UAE Emirates options
const emiratesOptions = [
  { value: 'dubai', label: 'Dubai' },
  { value: 'abu-dhabi', label: 'Abu Dhabi' },
  { value: 'sharjah', label: 'Sharjah' },
  { value: 'ajman', label: 'Ajman' },
  { value: 'ras-al-khaimah', label: 'Ras Al Khaimah' },
  { value: 'fujairah', label: 'Fujairah' },
  { value: 'umm-al-quwain', label: 'Umm Al Quwain' }
];

const AddressForm = ({ isOpen, onClose, onSave, editData = null, isEditing = false }) => {
  const [saveAsType, setSaveAsType] = useState("other");
  const [customSaveAs, setCustomSaveAs] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState(DEFAULT_POSITION);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { currentLocation, getCurrentLocation, isGettingLocation, locationPermission } = useLocation();
  const dispatch = useDispatch()
  const searchInputRef = useRef(null);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const loading = useSelector(state=>state?.Address?.loading)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  // Load saved location from cookies and initialize form
  const loadSavedLocation = useCallback(() => {
    try {
      const savedLocation = getCookie('userLocation');
      if (savedLocation) {
        const parsedLocation = JSON.parse(savedLocation);
        setCoordinates(parsedLocation.coordinates);
        setSelectedAddress(parsedLocation.address);
        setSearchQuery(parsedLocation.address);
        return parsedLocation;
      }
    } catch (error) {
      console.error('Error loading saved location:', error);
    }
    return null;
  }, []);

  // Initialize location on component mount
  useEffect(() => {
    if (isOpen && !editData) {
      // Use current location from context
      if (currentLocation && currentLocation.coordinates !== DEFAULT_POSITION) {
        setCoordinates(currentLocation.coordinates);
        setSelectedAddress(currentLocation.address);
        setSearchQuery(currentLocation.address);
      } else {
        // Load from cookies as fallback
        loadSavedLocation();
      }
    }
  }, [isOpen, editData, currentLocation, loadSavedLocation]);

  // Update coordinates when current location changes
  useEffect(() => {
    if (currentLocation.coordinates && !editData) {
      setCoordinates(currentLocation.coordinates);
      setSelectedAddress(currentLocation.address);
      setSearchQuery(currentLocation.address);
    }
  }, [currentLocation.coordinates, currentLocation.address, editData]);

  // Debug location changes
  useEffect(() => {
    console.log('AddressForm received location update:', currentLocation);
  }, [currentLocation]);

  // Function to update location display when coordinates change
  const updateLocationDisplay = useCallback((newCoordinates) => {
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: newCoordinates }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address;
          const addressComponents = results[0].address_components;
          
          let city = "";
          let area = "";
          
          // Extract city and area from address components
          addressComponents.forEach(component => {
            const types = component.types;
            if (types.includes('locality')) {
              city = component.long_name;
            } else if (types.includes('sublocality') || types.includes('sublocality_level_1')) {
              area = component.long_name;
            }
          });
          
          setSelectedAddress(address);
          setSearchQuery(address);
        }
      });
    }
  }, []);

  // Debug Google Maps loading
  useEffect(() => {
    console.log('Google Maps loading status:', { isLoaded, loadError });
    if (loadError) {
      console.error('Google Maps load error:', loadError);
    }
  }, [isLoaded, loadError]);

  // Initialize Google Maps services
  useEffect(() => {
    if (isLoaded && window.google) {
      try {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
        placesService.current = new window.google.maps.places.PlacesService(
          document.createElement('div')
        );
        console.log('Google Maps services initialized successfully');
      } catch (error) {
        console.error('Error initializing Google Maps services:', error);
      }
    } else if (!isLoaded) {
      console.log('Google Maps is still loading...');
    } else {
      console.error('Google Maps failed to load');
    }
  }, [isLoaded]);

  // Validation schema
  const validationSchema = Yup.object().shape({
    emirate: Yup.object().required("Emirate is required"),
    city: Yup.string().required("City is required"),
    area: Yup.string().required("Area is required"),
    street: Yup.string().required("Street is required"),
    building: Yup.string().required("Building is required"),
    apartment: Yup.string().required("Apartment is required"),
    landmark: Yup.string().required("Landmark is required"),
    saveAs: Yup.string(),
     receiversPhonenumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  // Initial values
  const initialValues = {
    emirate: editData?.emirate ? emiratesOptions.find(opt => opt.value === editData.emirate) || emiratesOptions[0] : null,
    city: editData?.city || currentLocation.city || "",
    area: editData?.area || currentLocation.area || "",
    street: editData?.street || "",
    building: editData?.building || "",
    apartment: editData?.apartment || "",
    landmark: editData?.landmark || "",
    saveAs: editData?.saveAs || "",
    receiversPhonenumber: editData?.receiversPhonenumber || "",
    isDefault: editData?.isDefault || false,
  };

  useEffect(() => {
    if (editData) {
      setSaveAsType(editData.saveAs || "other");
      setCustomSaveAs(editData.saveAs || "");
      if (editData.coordinates) {
        const editCoordinates = { lat: editData.coordinates.lat, lng: editData.coordinates.lng };
        setCoordinates(editCoordinates);
        
        // Reverse geocode the coordinates to get address details
        if (isLoaded && window.google && window.google.maps) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: editCoordinates }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const address = results[0].formatted_address;
              const addressComponents = results[0].address_components;
              
              let city = "";
              let area = "";
              
              // Extract city and area from address components
              addressComponents.forEach(component => {
                const types = component.types;
                if (types.includes('locality')) {
                  city = component.long_name;
                } else if (types.includes('sublocality') || types.includes('sublocality_level_1')) {
                  area = component.long_name;
                }
              });
              
              setSelectedAddress(address);
              setSearchQuery(address);
              
              // Update the current location context with the edit data
              if (currentLocation && currentLocation.updateLocation) {
                currentLocation.updateLocation({
                  address: address,
                  city: city || editData.city || "Dubai",
                  area: area || editData.area || "y",
                  coordinates: editCoordinates
                });
              }
            }
          });
        }
      }
    }
  }, [editData, currentLocation]);

  // Reverse geocode edit data coordinates when Google Maps is loaded
  useEffect(() => {
    if (isLoaded && editData && editData.coordinates) {
      const editCoordinates = { lat: editData.coordinates.lat, lng: editData.coordinates.lng };
      
      // Only reverse geocode if we don't already have the address
      if (!selectedAddress || selectedAddress === "") {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: editCoordinates }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const address = results[0].formatted_address;
            const addressComponents = results[0].address_components;
            
            let city = "";
            let area = "";
            
            // Extract city and area from address components
            addressComponents.forEach(component => {
              const types = component.types;
              if (types.includes('locality')) {
                city = component.long_name;
              } else if (types.includes('sublocality') || types.includes('sublocality_level_1')) {
                area = component.long_name;
              }
            });
            
            setSelectedAddress(address);
            setSearchQuery(address);
            
            console.log('Reverse geocoded edit data:', { address, city, area });
          }
        });
      }
    }
  }, [isLoaded, editData, selectedAddress]);

  const handleSaveAsTypeChange = (type, setFieldValue) => {
    setSaveAsType(type);
    if (type !== "other") {
      setFieldValue('saveAs', '');
    }
  };



  // Search functionality
  const handleSearchInputChange = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2 && autocompleteService.current) {
      setIsSearching(true);
      autocompleteService.current.getPlacePredictions(
        {
          input: query,
          componentRestrictions: { country: 'ae' }, // Restrict to UAE
          types: ['geocode', 'establishment']
        },
        (predictions, status) => {
          setIsSearching(false);
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSearchResults(predictions);
            setShowSearchResults(true);
          } else {
            setSearchResults([]);
            setShowSearchResults(false);
          }
        }
      );
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, []);

  const handleSearchResultClick = useCallback((prediction) => {
    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: prediction.place_id,
          fields: ['geometry', 'formatted_address', 'address_components']
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            const newPosition = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            };
            setCoordinates(newPosition);
            updateLocationDisplay(newPosition);
            setShowSearchResults(false);
            
            // Extract address components
            if (place.address_components) {
              extractAddressComponents(place.address_components);
            }
          }
        }
      );
    }
  }, [updateLocationDisplay]);

  // When a place is selected from autocomplete
  const handlePlaceChanged = useCallback(() => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const newPosition = { lat, lng };
      setCoordinates(newPosition);
      updateLocationDisplay(newPosition);
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });
      }
    }
  }, [updateLocationDisplay]);

  const extractAddressComponents = (addressComponents) => {
    const components = {};
    addressComponents.forEach(component => {
      const types = component.types;
      if (types.includes('locality')) {
        components.city = component.long_name;
      } else if (types.includes('sublocality') || types.includes('sublocality_level_1')) {
        components.area = component.long_name;
      } else if (types.includes('route')) {
        components.street = component.long_name;
      }
    });
    
    // You can auto-fill form fields here if needed
    console.log('Extracted components:', components);
  };

  const handleMapClick = useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setCoordinates(newPosition);
    updateLocationDisplay(newPosition);
  }, [updateLocationDisplay]);

  const handleMarkerDragEnd = useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setCoordinates(newPosition);
    updateLocationDisplay(newPosition);
  }, [updateLocationDisplay]);

  const handleSubmit = (values, { setSubmitting, setFieldError, resetForm }) => {
    // Custom validation for saveAs when type is 'other'
    if (saveAsType === 'other' && (!values.saveAs || values.saveAs.trim() === '')) {
      setFieldError('saveAs', 'Save as label is required');
      setSubmitting(false);
      return;
    }

    const addressData = {
      ...values,
      emirate: values.emirate.value,
      saveAsType,
      saveAs: saveAsType === "other" ? values.saveAs : saveAsType.toUpperCase(),
      coordinates: {
        lat: coordinates.lat,
        lng: coordinates.lng
      }
    };

    // Use Redux actions for state management
    if (editData) {
      dispatch(updateAddressRequest(editData?._id, addressData, resetForm));
    } else {
      dispatch(addAddressRequest(addressData, resetForm));
    }

    // Call the original onSave callback if provided
    if (onSave) {
      onSave(addressData);
    }
    
    setSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(255,255,255,0.7)] z-[999] flex justify-start">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        {/* Header - Fixed */}
        <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {isEditing ? "Edit Address" : "Add Address"}
            </h1>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>



        {/* Form - Scrollable */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnMount={false}
            validateOnChange={true}
            validateOnBlur={true}
            enableReinitialize={true}
          >
            {({ values, errors, touched, setFieldTouched, setFieldValue, validateForm, isSubmitting }) => {
              // Update form fields when current location changes
              useEffect(() => {
                if (currentLocation.city && !editData) {
                  setFieldValue('city', currentLocation.city);
                }
                if (currentLocation.area && !editData) {
                  setFieldValue('area', currentLocation.area);
                }
              }, [currentLocation.city, currentLocation.area, setFieldValue, editData]);

              return (
              <Form className="p-4 space-y-6">
                {/* Map Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Location on Map
                    </h2>
                    <button
                      type="button"
                      onClick={() => setShowMap(!showMap)}
                      className="flex items-center text-blue-600 text-sm"
                    >
                      <Map className="w-4 h-4 mr-1" />
                      {showMap ? 'Hide Map' : 'Show Map'}
                    </button>
                  </div>
                  
                  {showMap && (
                    <>
                                            {!isLoaded ? (
                        <div className="h-64 w-full mb-4 rounded border border-gray-300 flex items-center justify-center bg-gray-50">
                          <div className="text-center">
                            {loadError ? (
                              <>
                                <p className="text-sm text-red-600 mb-2">Failed to load Google Maps</p>
                                <p className="text-xs text-gray-500 mb-2">Error: {loadError.message}</p>
                                <p className="text-xs text-gray-500">Please check your internet connection</p>
                              </>
                            ) : (
                              <>
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                <p className="text-sm text-gray-600">Loading map...</p>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Search Bar */}
                          <div className="relative mb-3">
                            {isLoaded && (
                              <Autocomplete
                                onLoad={ref => (autocompleteRef.current = ref)}
                                onPlaceChanged={handlePlaceChanged}
                              >
                                <div className="relative">
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                                  <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for a location..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              </Autocomplete>
                            )}
                          </div>

                          {/* Map Container */}
                          <div className="h-64 w-full mb-4 rounded overflow-hidden border relative">
                            <GoogleMap
                              mapContainerStyle={{ width: '100%', height: '100%' }}
                              center={coordinates}
                              zoom={15}
                              onClick={handleMapClick}
                              onLoad={map => {
                                mapRef.current = map;
                                // Pan to current location if available
                                if (coordinates && coordinates !== DEFAULT_POSITION) {
                                  map.panTo(coordinates);
                                  map.setZoom(15);
                                }
                              }}
                            >
                              <Marker 
                                position={coordinates} 
                                draggable={true}
                                onDragEnd={handleMarkerDragEnd}
                              />
                            </GoogleMap>
                            
                            {/* Map Instructions */}
                            <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600">
                              Click map or drag marker to set location
                            </div>
                          </div>


                        </>
                      )}
                    </>
                  )}
                  
                  {selectedAddress && (
                    <div className="mb-2 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700">{selectedAddress}</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                    {currentLocation.coordinates !== DEFAULT_POSITION && (
                      <span className="text-green-600 ml-2">
                        ({getCookie('userLocation') ? 'Saved Location' : 'Current Location'})
                      </span>
                    )}
                  </p>
                </div>

                {/* Address Details Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Address Details
                  </h2>
                  
                  {/* Emirate - React Select */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emirate <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={values.emirate}
                      onChange={(option) => setFieldValue('emirate', option)}
                      options={emiratesOptions}
                      placeholder="Select emirate"
                      className={`${
                        errors.emirate && touched.emirate ? 'border-red-500' : ''
                      }`}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderColor: errors.emirate && touched.emirate ? '#ef4444' : '#d1d5db',
                          '&:hover': {
                            borderColor: errors.emirate && touched.emirate ? '#ef4444' : '#9ca3af'
                          }
                        })
                      }}
                    />
                    {errors.emirate && touched.emirate && (
                      <div className="text-red-500 text-sm mt-1">{errors.emirate}</div>
                    )}
                  </div>

                  {/* City */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="city"
                      type="text"
                      placeholder="Enter city"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.city && touched.city
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Area */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="area"
                      type="text"
                      placeholder="Enter area"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.area && touched.area
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="area"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Street */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="street"
                      type="text"
                      placeholder="Enter street"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.street && touched.street
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="street"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Building */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Building <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="building"
                      type="text"
                      placeholder="Enter building"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.building && touched.building
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="building"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Apartment */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartment <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="apartment"
                      type="text"
                      placeholder="Enter apartment"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.apartment && touched.apartment
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="apartment"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Landmark */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Landmark <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="landmark"
                      type="text"
                      placeholder="Enter landmark"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.landmark && touched.landmark
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="landmark"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Save As Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    SAVE AS
                  </h2>
                  
                  {/* Save As Type Buttons */}
                  <div className="flex space-x-2 mb-4">
                    <button
                      type="button"
                      onClick={() => handleSaveAsTypeChange("home", setFieldValue)}
                      className={`flex-1 py-2 px-4 rounded-md border text-sm font-medium transition-colors ${
                        saveAsType === "home"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Home className="w-4 h-4 inline mr-2" />
                      Home
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveAsTypeChange("work", setFieldValue)}
                      className={`flex-1 py-2 px-4 rounded-md border text-sm font-medium transition-colors ${
                        saveAsType === "work"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Work
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveAsTypeChange("other", setFieldValue)}
                      className={`flex-1 py-2 px-4 rounded-md border text-sm font-medium transition-colors ${
                        saveAsType === "other"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Other
                    </button>
                  </div>

                  {/* Custom Save As Label */}
                  {saveAsType === "other" && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Save as <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="saveAs"
                        type="text"
                        placeholder="Enter"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.saveAs && touched.saveAs
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="saveAs"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  )}
                </div>

                {/* Default Address Toggle */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Default Address
                  </h2>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Set as default address</p>
                      <p className="text-xs text-gray-500">This will be your primary delivery address</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <Field
                        name="isDefault"
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Receiver's Phone Number */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Receiver's phone number
                  </h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="receiversPhonenumber"
                      type="tel"
                      placeholder="Enter number"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.receiversPhonenumber && touched.receiversPhonenumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="receiversPhonenumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={async () => {
                      // Force validation on all fields
                      setFieldTouched('emirate', true, false);
                      setFieldTouched('city', true, false);
                      setFieldTouched('area', true, false);
                      setFieldTouched('street', true, false);
                      setFieldTouched('building', true, false);
                      setFieldTouched('apartment', true, false);
                      setFieldTouched('landmark', true, false);
                      setFieldTouched('receiversPhonenumber', true, false);
                      if (saveAsType === 'other') {
                        setFieldTouched('saveAs', true, false);
                      }
                      
                      // Trigger validation
                      const errors = await validateForm();
                      console.log('Validation errors:', errors);
                    }}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? "Saving..." : (isEditing ? "Update" : "Add")}
                  </button>
                </div>
              </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddressForm; 