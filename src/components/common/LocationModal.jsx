import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_POSITION = [9.9312, 76.2673]; // Kochi, Kerala

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function LocationModal({ open, onClose, onConfirm }) {
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reverse geocode
  const fetchAddress = async (lat, lng) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      setAddress(data.display_name || '');
    } catch (e) {
      setError('Failed to fetch address');
    } finally {
      setLoading(false);
    }
  };

  // Use browser geolocation
  const handleUseCurrent = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        fetchAddress(latitude, longitude);
      },
      () => {
        setError('Permission denied or unavailable');
        setLoading(false);
      }
    );
  };

  // When marker moves, update address
  React.useEffect(() => {
    if (position) {
      fetchAddress(position[0], position[1]);
    }
    // eslint-disable-next-line
  }, [position[0], position[1]]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-semibold mb-2">Select your location</h2>
        <button
          className="mb-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          onClick={handleUseCurrent}
          disabled={loading}
        >
          Use current location
        </button>
        <div className="h-56 w-full mb-2 rounded overflow-hidden">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationPicker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>
        <div className="mb-2 text-xs text-gray-700 min-h-[2em]">
          {loading ? 'Loading address...' : address}
        </div>
        {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
        <button
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          onClick={() => onConfirm({ address, lat: position[0], lng: position[1] })}
          disabled={loading || !address}
        >
          Confirm location
        </button>
      </div>
    </div>
  );
} 