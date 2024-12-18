"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

const LiveTrackingMap = () => {
  const [busLocations, setBusLocations] = useState([]);

  // Fix Leaflet icon issue for Next.js
  useEffect(() => {
    // Fix default icon issues
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
      iconUrl: "leaflet/images/marker-icon.png",
      shadowUrl: "leaflet/images/marker-shadow.png",
    });

    const fetchBusLocations = async () => {
      try {
        const response = await fetch("/api/getlocations");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Received bus locations:", data);
        
        // Filter out any invalid data
        const validLocations = data.filter(bus => 
          bus && 
          bus.latitude && 
          bus.longitude && 
          !isNaN(parseFloat(bus.latitude)) && 
          !isNaN(parseFloat(bus.longitude))
        );

        setBusLocations(validLocations);
      } catch (error) {
        console.error("Error fetching bus locations:", error);
      }
    };

    // Initial fetch
    fetchBusLocations();
    
    // Set up polling
    const interval = setInterval(fetchBusLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  // Create bus icon instance
  const busIcon = new L.Icon({
    iconUrl: "/buaas.png",
    iconSize: [100, 100],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        height: 400,
        margin: "20px auto",
        border: "2px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#fff",
      }}
    >
      <MapContainer
        center={[35.12011041069839, 33.94002914428712]}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {busLocations.map((bus) => (
          <Marker
            key={bus.bus_id}
            position={[bus.latitude, bus.longitude]}
            icon={busIcon}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong>Bus {bus.bus_id}</strong>
                <br />
                Current Stop: {bus.current_stop || 'N/A'}
                <br />
                Next Stop: {bus.next_stop || 'N/A'}
                <br />
                Passengers: {bus.passengers || 'N/A'}
                <br />
                Estimated Time: {bus.estimated || 'N/A'}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default LiveTrackingMap;