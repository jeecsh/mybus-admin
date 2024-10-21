"use client";

import { useState } from 'react';
import Navbar from '../components/navbar'; // Adjust the import path as needed
import Sidebar from '../components/sidebar'; // Adjust the import path as needed
import MapComponent from '../components/map';
import styles from '../addRoute/addRoute.module.css';

export default function AddRoutePage() {
  const [routeId, setRouteId] = useState('');
  const [routeName, setRouteName] = useState('');
  const [routeColor, setRouteColor] = useState('#000000'); // Default color
  const [routeDescription, setRouteDescription] = useState('');
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const handleColorChange = (e) => {
    setRouteColor(e.target.value);
  };

  const handleMapClick = (coordinates) => {
    setRouteCoordinates(coordinates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      routeId,
      routeName,
      routeColor,
      routeDescription,
      routeCoordinates,
    };

    console.log('Form Data:', formData); // Check if formData is correctly populated

    try {
      const response = await fetch('http://localhost:3000/api/sendRoute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit route');
      }

      const data = await response.json();
      console.log('Route submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting route:', error);
    }
  };

  return (
    <div className={styles.pageLayout}>
      <Navbar className={styles.navbar} />
      <div className={styles.mainContent}>
        <Sidebar className={styles.sidebar} />
        <div className={styles.content}>
          <h1 className={styles.title}>Add Route</h1> {/* Updated class name for consistency */}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="routeName" className={styles.label}>Route Name:</label>
              <input
                type="text"
                id="routeName"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="routeId" className={styles.label}>Route ID:</label>
              <input
                type="text"
                id="routeId"
                value={routeId}
                onChange={(e) => setRouteId(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="routeColor" className={styles.label}>Route Color:</label>
              <input
                type="color"
                id="routeColor"
                value={routeColor}
                onChange={handleColorChange}
                className={styles.colorPicker}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="routeDescription" className={styles.label}>Description:</label>
              <textarea
                id="routeDescription"
                value={routeDescription}
                onChange={(e) => setRouteDescription(e.target.value)}
                className={styles.textareaField}
                rows="4"
              />
            </div>
            <div className={styles.mapSection}>
              <MapComponent onMapClick={handleMapClick} />
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
