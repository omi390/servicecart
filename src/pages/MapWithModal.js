// src/MapWithModal.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet/hooks";
import "leaflet-geosearch/dist/geosearch.css";
import axios from "axios";
import { toast } from "react-toastify";
import { MdArrowForwardIos } from "react-icons/md";

const SearchField = ({ onSearchResult }) => {
  const map = useMap();

  useEffect(() => {

    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoClose: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x, y } = result.location;
      onSearchResult([y, x]);
    });

    return () => map.removeControl(searchControl);
  }, [map, onSearchResult]);

  return null;
};



const MapWithModal = ({ isOpen, onClose, onProceed }) => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");
  
    console.log("Latitude:", lat);
    console.log("Longitude:", lng);
  
    if (lat !== null && lng !== null) {
      setLocation([parseFloat(lat), parseFloat(lng)]);
    } else {
      console.error("Latitude or Longitude not found in localStorage");
    }
  }, []);
  const MapEvents = () => {
    useMapEvents({
      click(e) {

        localStorage.setItem("lat",e.latlng.lat);
        localStorage.setItem("lng",e.latlng.lng);
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const handleProceed = async () => {
    //api
    try {
      console.log("try block");
      const data = {
        lat: location[0],
        lng: location[1],
      };
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/customer/config/get-zone-id`,
        {
          params: data, // Pass data as query parameters
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.content) {
        console.log("got zone id");
        const zoneId = localStorage.setItem(
          "zoneId",
          response.data.content.zone.id
        );
        localStorage.setItem(
          "zoneName",
          response.data.content.zone.name
        );
        console.log(location[0]);
        onProceed(location);
        onClose(); // Close the modal when the user clicks "Proceed"
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    //api ends
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Set Location"
      // ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
        },
      }}
    >
    <div style={{
      display:"flex",
      justifyContent:"space-between"
    }}>
       <div>
       <h2>Set Your Location</h2>
       <p>Click on the map or use the search bar to set your location.</p>
       </div>

      {location && (
        <button className="proceedBtnLocation" onClick={handleProceed} style={{ marginTop: "10px" }}>
          Proceed 

        </button>
      )}
    </div>
      <MapContainer
        center={[15.852792, 74.498703]}
        zoom={13}
        style={{ height: "60vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="<https://www.openstreetmap.org/copyright>">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        <SearchField onSearchResult={setLocation} />
        {location && <Marker position={location} />}
      </MapContainer>
   
    </Modal>
  );
};

export default MapWithModal;
