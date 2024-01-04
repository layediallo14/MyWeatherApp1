// Map.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const Map = ({ mapData }) => {
  const defaultCenter = [0, 0]; 

  return (
    <div className="map-container">
      <MapContainer
        center={defaultCenter}
        zoom={10}
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer
          url={mapData} // Utilisez votre URL OpenWeatherMap pour les tuiles
        />
        <Marker position={defaultCenter}>
          <Popup>Ma position</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
