import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({lat,lng,setPinLatLng}) => {
    console.log(lat);
  const defaultLat = parseFloat(lat);
  const defaultLng = parseFloat(lng);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA0sLn-eYzgO1zUhvRNEooCzg8xcRImd3Y', // Replace with your API key
    libraries,
  });

  const [selected, setSelected] = useState({
    lat: defaultLat,
    lng: defaultLng,
  });

  useEffect(() => {
    setSelected({
      lat: defaultLat,
      lng: defaultLng,
    });
    setPinLatLng({
        lat: defaultLat,
        lng: defaultLng,
    });
  }, [defaultLat, defaultLng]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const onMapClick = (event) => {
    setSelected({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setPinLatLng({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    
  };

  return (
    <div style={{width:"300px"}}>
              <div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={selected}
        options={options}
        onClick={onMapClick}
      >
        <Marker
          position={{ lat: selected.lat, lng: selected.lng }}
          draggable={true}
          onDragEnd={(event) =>
            setSelected({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            })
          }
        />
      </GoogleMap>
      {/* <div> */}
       
      </div>
    </div>
  );
};

export default Map;
