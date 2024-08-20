"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import BusLineSelector from '../components/buslineselect';
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

  const busLines = [
    { id: 'busline-id-1', name: 'Bus Line 1' },
    { id: 'busline-id-2', name: 'Bus Line 2' },
    // Add more bus lines as needed
  ];

  const handleMapClick = (e) => {
    setStationLocation([e.latlng.lat, e.latlng.lng]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const stationData = {
      Id:mapId,
      name: stationName,
      loc: stationLocation,
      lines: selectedBusLines,
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
                value={`${stationLocation[0]}, ${stationLocation[1]}`}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <BusLineSelector busLines={busLines} selectedBusLines={selectedBusLines} setSelectedBusLines={setSelectedBusLines} />
              <button type="submit" className={styles.button}>Add Station</button>
            </div>
          </div>
          <div className={styles.mapSection}>
            <label className={styles.label}>Location</label>
            <MapComponent center={stationLocation} onMapClick={handleMapClick} busStations={busStations} />
          </div>
        </div>
      </Box>
    </div>
  );
}
