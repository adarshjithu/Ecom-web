import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Cookie utility functions
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const setCookie = (name, value, days = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${JSON.stringify(
    value
  )};expires=${expires.toUTCString()};path=/`;
};

const DEFAULT_POSITION = { lat: 25.1843, lng: 55.2604 }; // Dubai coords fallback

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState({
    address: "Select your location",
    city: "",
    area: "",
    coordinates: DEFAULT_POSITION,
  });
  const [locationPermission, setLocationPermission] = useState("prompt");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Load saved location from cookies
  const loadSavedLocation = useCallback(() => {
    try {
      const savedLocation = getCookie("userLocation");
      if (savedLocation) {
        const parsed = JSON.parse(savedLocation);
        setCurrentLocation(parsed);
        return parsed;
      }
    } catch (error) {
      console.error("Error loading saved location:", error);
    }
    return null;
  }, []);

  // Save location to cookies
  const saveLocationToCookie = useCallback((locationData) => {
    try {
      setCookie("userLocation", locationData, 30);
    } catch (error) {
      console.error("Error saving location:", error);
    }
  }, []);

  // Get current location
  const getCurrentLocation = useCallback(() => {
    setIsGettingLocation(true);

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser");
      const fallback = {
        address: "Location not supported",
        city: "Select your",
        area: "",
        coordinates: DEFAULT_POSITION,
      };
      setCurrentLocation(fallback);
      setIsGettingLocation(false);
      saveLocationToCookie(fallback);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = { lat: latitude, lng: longitude };

        setLocationPermission("granted");

        if (window.google && window.google.maps) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: coords }, (results, status) => {
            if (status === "OK" && results[0]) {
              const address = results[0].formatted_address;
              const comps = results[0].address_components;

              let city = "";
              let area = "";

              comps.forEach((c) => {
                if (c.types.includes("locality")) city = c.long_name;
                if (
                  c.types.includes("sublocality") ||
                  c.types.includes("sublocality_level_1")
                )
                  area = c.long_name;
              });

              // Fallback to administrative_area_level if city not found
              if (!city) {
                const admin = comps.find((c) =>
                  c.types.includes("administrative_area_level_1")
                );
                city = admin ? admin.long_name : "Select your location";
              }

              const loc = {
                address,
                city,
                area: area || "Select your location",
                coordinates: coords,
              };

              setCurrentLocation(loc);
              saveLocationToCookie(loc);
            } else {
              const loc = {
                address: "Location found",
                city: "Unknown",
                area: "",
                coordinates: coords,
              };
              setCurrentLocation(loc);
              saveLocationToCookie(loc);
            }
            setIsGettingLocation(false);
          });
        } else {
          const loc = {
            address: "Location found",
            city: "Unknown",
            area: "",
            coordinates: coords,
          };
          setCurrentLocation(loc);
          setIsGettingLocation(false);
          saveLocationToCookie(loc);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationPermission("denied");
        const fallback = {
          address: "Location access denied",
          city: "Unknown",
          area: "",
          coordinates: DEFAULT_POSITION,
        };
        setCurrentLocation(fallback);
        setIsGettingLocation(false);
        saveLocationToCookie(fallback);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 min
      }
    );
  }, [saveLocationToCookie]);

  // Update location manually (when user selects from a form)
  const updateLocation = useCallback(
    (locationData) => {
      const newLoc = {
        address: locationData.address,
        city: locationData.city || "Unknown",
        area: locationData.area || "",
        coordinates: locationData.coordinates || DEFAULT_POSITION,
      };

      console.log("Updating location context:", newLoc);
      setCurrentLocation(newLoc);
      saveLocationToCookie(newLoc);

      // force rerender
      setTimeout(() => {
        setCurrentLocation((prev) => ({ ...prev }));
      }, 100);
    },
    [saveLocationToCookie]
  );

  useEffect(() => {
    const saved = loadSavedLocation();
    if (!saved) {
      getCurrentLocation();
    }
  }, [loadSavedLocation, getCurrentLocation]);

  const value = {
    currentLocation,
    locationPermission,
    isGettingLocation,
    getCurrentLocation,
    updateLocation,
    loadSavedLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
