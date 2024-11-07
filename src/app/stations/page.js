"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import BusLineSelector from '../components/buslineselect';
import Navbar from '../components/navbar'; // Import Navbar
import Sidebar from '../components/sidebar'; // Import Sidebar
import 'leaflet/dist/leaflet.css';
import styles from './addStationPage.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';  

// Dynamically import the Map component to ensure it only renders on the client side
const MapComponent = dynamic(() => import('../components/mapComponent'), { ssr: false });

export default function AddStationPage() {
  const [stationName, setStationName] = useState('');
  const [stationLocation, setStationLocation] = useState([51.505, -0.09]); // Default location
  const [selectedBusLines, setSelectedBusLines] = useState([]);
  const [mapId, setMapId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [busStations, setBusStations] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Ensure map rendering only happens on the client
  }, []);

  useEffect(() => {
    const fetchBusStations = async () => {
      try {
        const response = await fetch('/api/getStation');
        if (!response.ok) {
          throw new Error('Failed to fetch bus stations');
        }
        const data = await response.json();
        setBusStations(data);
      } catch (error) {
        console.error('Error fetching bus stations:', error);
      }
    };

    fetchBusStations();
  }, []);

  // Update the busLines array with numeric IDs
  const busLines = [
    { id: 1, name: 'Bus Line 1' },
    { id: 2, name: 'Bus Line 2' },
    { id: 3, name: 'Bus Line 3' },
    { id: 4, name: 'Bus Line 4' },
    { id: 5, name: 'Bus Line 5' },
  ];

  const handleMapClick = (e) => {
    setStationLocation([e.latlng.lat, e.latlng.lng]);
  };

  // Helper function to format latitude and longitude into degree format
  const formatLocation = ([lat, lng]) => {
    const formattedLat = `${Math.abs(lat).toFixed(6)}°${lat >= 0 ? 'N' : 'S'}`;
    const formattedLng = `${Math.abs(lng).toFixed(6)}°${lng >= 0 ? 'E' : 'W'}`;
    return [formattedLng, formattedLat]; // Return in [Longitude, Latitude] format
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Check if required fields are filled
    if (!stationName || !mapId || selectedBusLines.length === 0) {
      setError('Please fill out all required fields.');
      return; // Stop form submission
    }

    // Format location as degrees with N/S and E/W suffixes
    const formattedLocation = formatLocation(stationLocation);

    const stationData = {
      Id: mapId,
      name: stationName,
      loc: formattedLocation, // Use formatted location [Longitude°E/W, Latitude°N/S]
      lines: selectedBusLines.map(line => line.id), // Since IDs are already numbers, no need to extract
    };

    try {
      const response = await fetch('/api/addStation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stationData),
      });

      if (!response.ok) {
        throw new Error('Failed to add station');
      }

      const data = await response.json();
      setSuccessMessage('Station added successfully!');
    } catch (error) {
      setError('Failed to add station.');
    }
  };

  return (
    <div className={styles.container}>
      <Navbar /> {/* Add the Navbar */}
      <Sidebar /> {/* Add the Sidebar */}
      <div className={styles.content}>
        <h1 className={styles.heading}>Add Station</h1>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' }, // Ensure full-width
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className={styles.formWrapper}>
            <div className={styles.formSection}>
              <div className={styles.formGroup}>
                <TextField
                  required
                  id="outlined-required"
                  label="Station Name"
                  value={stationName}
                  onChange={(e) => setStationName(e.target.value)}
                  placeholder="Enter station name"
                  variant="outlined"
                />
                <TextField
                  required
                  id="mapId"
                  label="Map ID"
                  value={mapId}
                  onChange={(e) => setMapId(e.target.value)}
                  placeholder="Enter map ID"
                  variant="outlined"
                />
                <TextField
                  id="outlined-location"
                  label="Location"
                  value={`[${stationLocation[0].toFixed(6)}°N, ${stationLocation[1].toFixed(6)}°E]`} // Format for display
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />
                <BusLineSelector busLines={busLines} selectedBusLines={selectedBusLines} setSelectedBusLines={setSelectedBusLines} />
                <button type="submit" className={styles.button1}>Add Station</button>
              </div>
            </div>
            <div className={styles.mapSection}>
              <label className={styles.label}>Location</label>
              {/* Conditionally render the map only if the component is mounted */}
              {isMounted && (
                <MapComponent center={stationLocation} onMapClick={handleMapClick} busStations={busStations} />
              )}
            </div>
          </div>                                                                      
        </Box>
      </div>  
    </div>
  );
}
