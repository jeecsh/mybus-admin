"use client";

import { useState } from 'react';
import Navbar from '../components/navbar'; 
import Sidebar from '../components/sidebar'; 
import MapComponent from '../components/map';
import styles from '../addRoute/addRoute.module.css';

export default function AddRoutePage() {
  const [routeId, setRouteId] = useState('');
  const [routeName, setRouteName] = useState('');
  const [routeColor, setRouteColor] = useState('#000000');
  const [routeDescription, setRouteDescription] = useState('');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(); // Track sidebar state

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

    console.log('Form Data:', formData);

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

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.pageLayout}>
      <Navbar className={styles.navbar}toggleSidebar={toggleSidebar} />
      <div className={styles.mainContent}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`${styles.content} ${!isSidebarOpen ? styles.shifted : ''}`}>
          <h1 className={styles.title}>Add Route</h1>
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
