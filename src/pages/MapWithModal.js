// src/MapWithModal.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from 'react-modal';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet/hooks';
import 'leaflet-geosearch/dist/geosearch.css';

const SearchField = ({ onSearchResult }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      autoClose: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result) => {
      const { x, y } = result.location;
      onSearchResult([y, x]);
    });

    return () => map.removeControl(searchControl);
  }, [map, onSearchResult]);

  return null;
};

const MapWithModal = ({ isOpen, onClose, onProceed }) => {
  const [location, setLocation] = useState(null);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const handleProceed = () => {
    onProceed(location);
    onClose(); // Close the modal when the user clicks "Proceed"
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Set Location"
      // ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
        },
      }}
    >
      <h2>Set Your Location</h2>
      <p>Click on the map or use the search bar to set your location.</p>
      <MapContainer center={[51.505, -0.09]} zoom={13}   style={{ height: '60vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="<https://www.openstreetmap.org/copyright>">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        <SearchField onSearchResult={setLocation} />
        {location && <Marker position={location} />}
      </MapContainer>
      {location && (
        <button onClick={handleProceed} style={{ marginTop: '10px' }}>
          Proceed
        </button>
      )}
    </Modal>
  );
};

export default MapWithModal;
  