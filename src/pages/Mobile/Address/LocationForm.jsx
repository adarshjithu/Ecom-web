import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../../config/maps";
import { ArrowLeft, X, Navigation, MapPin } from "lucide-react";
import { useLocation } from "../../../context/LocationContext";

const containerStyle = {
  width: "100%",
  height: "250px",
};

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

const LocationForm = ({ isOpen, onClose, onSave }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const { currentLocation, updateLocation, getCurrentLocation, isGettingLocation, locationPermission } = useLocation();
  
  const [marker, setMarker] = useState(DEFAULT_POSITION);
  const [address, setAddress] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [localLocationData, setLocalLocationData] = useState({
    address: "",
    city: "",
    area: "",
    coordinates: DEFAULT_POSITION
  });
  const [isConfirming, setIsConfirming] = useState(false);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  // Load saved location from cookies and initialize form
  const loadSavedLocation = useCallback(() => {
    try {
      const savedLocation = getCookie('userLocation');
      if (savedLocation) {
        const parsedLocation = JSON.parse(savedLocation);
        setMarker(parsedLocation.coordinates);
        setAddress(parsedLocation.address);
        
        // Extract place name from address
        const addressParts = parsedLocation.address.split(',');
        setPlaceName(addressParts[0] || parsedLocation.area || "Selected Location");
        
        return parsedLocation;
      }
    } catch (error) {
      console.error('Error loading saved location:', error);
    }
    return null;
  }, []);

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
          
          setAddress(address);
          setPlaceName(area || city || "Selected Location");
          
          // Store the extracted data for use in handleConfirmLocation
          setLocalLocationData({
            address: address,
            city: city || "Dubai",
            area: area || "y",
            coordinates: newCoordinates
          });
        }
      });
    }
  }, []);

  // Initialize location on component mount
  useEffect(() => {
    if (isOpen) {
      // Use current location from context
      if (currentLocation && currentLocation.coordinates !== DEFAULT_POSITION) {
        setMarker(currentLocation.coordinates);
        setAddress(currentLocation.address);
        
        // Extract place name from address
        const addressParts = currentLocation.address.split(',');
        setPlaceName(addressParts[0] || currentLocation.area || "Selected Location");
        
        // Update the local location data to match context
        setLocalLocationData(currentLocation);
      } else {
        // Load from cookies as fallback
        loadSavedLocation();
      }
    }
  }, [isOpen, currentLocation, loadSavedLocation]);

  // Update local location data when marker changes
  useEffect(() => {
    if (marker && marker !== DEFAULT_POSITION) {
      updateLocationDisplay(marker);
    }
  }, [marker, updateLocationDisplay]);

  // Reverse geocode to get address from lat/lng
  const geocodeLatLng = useCallback((lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
        setPlaceName(results[0].address_components?.[0]?.long_name || "");
      }
    });
  }, []);

  // When marker is moved
  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const newPosition = { lat, lng };
    setMarker(newPosition);
    // updateLocationDisplay will be called by useEffect when marker changes
  };

  // When map is clicked
  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const newPosition = { lat, lng };
    setMarker(newPosition);
    // updateLocationDisplay will be called by useEffect when marker changes
  };

  // When a place is selected from autocomplete
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const newPosition = { lat, lng };
      setMarker(newPosition);
      // updateLocationDisplay will be called by useEffect when marker changes
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });
      }
    }
  };

  // Function to refresh current location
  const handleRefreshLocation = () => {
    getCurrentLocation();
  };

  // Function to confirm location and save
  const handleConfirmLocation = async () => {
    setIsConfirming(true);
    
    try {
      // Use the local location data that was updated by updateLocationDisplay
      const locationData = {
        lat: marker.lat,
        lng: marker.lng,
        address,
        placeName,
        city: localLocationData.city,
        area: localLocationData.area
      };
      
      // Update global location context with proper data structure
      const newLocationData = {
        address: address,
        city: localLocationData.city || "Dubai",
        area: localLocationData.area || "y",
        coordinates: { lat: marker.lat, lng: marker.lng }
      };
      
      console.log('Confirming location:', newLocationData);
      updateLocation(newLocationData);
      
      // Call the onSave callback
      onSave(locationData);
      onClose();
    } catch (error) {
      console.error('Error confirming location:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.7)]" onClick={onClose} />
      <div className="fixed left-0 top-0 h-full w-96 max-w-full bg-white shadow-2xl flex flex-col z-[1000]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">Select delivery location</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Current Location Display */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {isGettingLocation ? "Getting your location..." : localLocationData.area || currentLocation.area || "Current Location"}
              </h3>
              <p className="text-sm text-gray-500">
                {(localLocationData.city && localLocationData.area) || (currentLocation.city && currentLocation.area)
                  ? `${localLocationData.area || currentLocation.area}, ${localLocationData.city || currentLocation.city}, UAE`
                  : "Loading location details..."
                }
              </p>
              {locationPermission === "denied" && (
                <p className="text-xs text-red-500 mt-1">
                  Location access denied. Using default location.
                </p>
              )}
              <button
                onClick={handleRefreshLocation}
                disabled={isGettingLocation}
                className="text-blue-600 text-xs mt-1 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Navigation className="w-4 h-4 mr-1" />
                {isGettingLocation ? "Getting Location..." : "Refresh Location"}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b">
          {isLoaded && (
            <Autocomplete
              onLoad={ref => (autocompleteRef.current = ref)}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                type="text"
                placeholder="Search for a location..."
                className="w-full px-3 py-2 border rounded focus:outline-none"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </Autocomplete>
          )}
        </div>

        {/* Google Map */}
        <div className="w-full" style={{ height: 250 }}>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={marker}
              zoom={15}
              onClick={handleMapClick}
              onLoad={map => {
                mapRef.current = map;
                // Pan to current location if available
                if (marker && marker !== DEFAULT_POSITION) {
                  map.panTo(marker);
                  map.setZoom(15);
                }
              }}
            >
              <Marker
                position={marker}
                draggable
                onDragEnd={handleMarkerDragEnd}
              />
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-full">Loading Map...</div>
          )}
        </div>

        {/* Address Display */}
        <div className="p-4 flex flex-col gap-2">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-semibold text-base flex items-center justify-between">
              {placeName || "Selected Location"}
              <span className="text-xs text-blue-600 cursor-pointer">CHANGE</span>
            </div>
            <div className="text-sm text-gray-700 mt-1">{address}</div>
            <div className="text-xs text-gray-500 mt-1">
              Coordinates: {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
              {marker !== DEFAULT_POSITION && (
                <span className="text-green-600 ml-2">
                  ({localLocationData.coordinates !== DEFAULT_POSITION ? 'Updated Location' : 'Current Location'})
                </span>
              )}
            </div>
          </div>
          <button
            className="w-full bg-blue-700 text-white py-3 rounded font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleConfirmLocation}
            disabled={isConfirming}
          >
            {isConfirming ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Confirming...
              </div>
            ) : (
              "Confirm Location"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationForm; 