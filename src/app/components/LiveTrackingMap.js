"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Box } from "@mui/material";

// Function to fetch route data based on routeId
const fetchRouteData = (routeId) => {
  // Replace this with actual API calls or real-time database connections
  // Simulating data for different routes
  const routeData = {
    1: { lat: 40.748817, lng: -73.985428, nextStation: 'Station A' }, // Route 1 Data
    2: { lat: 40.730610, lng: -73.935242, nextStation: 'Station B' }, // Route 2 Data
    3: { lat: 40.758896, lng: -73.985130, nextStation: 'Station C' }, // Route 3 Data
    4: { lat: 40.712776, lng: -74.005974, nextStation: 'Station D' }, // Route 4 Data
  };
  return routeData[routeId] || { lat: 0, lng: 0, nextStation: 'Unknown Station' };
};

const LiveTrackingMap = ({ routeId }) => {
  const [busLocation, setBusLocation] = useState({ lat: 0, lng: 0 });
  const [nextStation, setNextStation] = useState("");

  useEffect(() => {
    // Simulate fetching data from a real-time API/database
    const routeData = fetchRouteData(routeId);
    setBusLocation({ lat: routeData.lat, lng: routeData.lng });
    setNextStation(routeData.nextStation);
  }, [routeId]);

  return (
    <Box 
      sx={{
        width: '100%',
        maxWidth: 600,  // max width of map container
        height: 400,  // fixed height for the map
        margin: '20px auto', // center the map in the page
        border: '2px solid #ddd', // Optional: border around the map container
        borderRadius: '8px', // Optional: rounded corners for the map container
        padding: '10px', // Padding around the map
        backgroundColor: '#fff', // Optional: background color
      }}
    >
      <MapContainer 
       center={[35.12011041069839, 33.94002914428712] }
        zoom={14} 
        style={{ width: '100%', height: '100%' }}  // Ensure map takes full width and height of the container
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={busLocation} 
          icon={new L.Icon({ iconUrl: '/buslogo.png', iconSize: [30, 30] })}
        >
          <Popup>{`Current Location: ${busLocation.lat}, ${busLocation.lng}`}</Popup>
        </Marker>
        {/* Next Station Marker */}
        <Marker position={{ lat: busLocation.lat + 0.01, lng: busLocation.lng + 0.01 }}>
          <Popup>{nextStation}</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default LiveTrackingMap;
