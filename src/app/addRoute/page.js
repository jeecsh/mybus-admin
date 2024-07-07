'use client'; 
import { useState } from 'react';
import MapComponent from '../components/map';
import styles from '../addRoute/addRoute.module.css'; // Import CSS module for AddRoutePage

export default function AddRoutePage() {
  const [routeName, setRouteName] = useState('');
  const [routeColor, setRouteColor] = useState('#ff0000'); // Default color
  const [routeDescription, setRouteDescription] = useState('');
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const handleColorChange = (e) => {
    setRouteColor(e.target.value);
  };

  const handleMapClick = (e) => {
    if (routeCoordinates.length < 20) {
      setRouteCoordinates([...routeCoordinates, e.latlng]);
    }
  };

  const removeCoordinate = (index) => {
    setRouteCoordinates(routeCoordinates.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data to be submitted
    const formData = {
      routeName,
      routeColor,
      routeDescription,
      routeCoordinates: routeCoordinates.map(coord => ({ lat: coord.lat, lng: coord.lng })),
    };
    console.log('Form Data:', formData);

    // Example of sending data to backend or performing other actions
    // Replace with actual submission logic
    // fetch('/api/submitRoute', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => response.json())
    //   .then(data => console.log('Submitted:', data))
    //   .catch(error => console.error('Error:', error));

    // You can reset form fields here if needed
    setRouteName('');
    setRouteColor('#ff0000');
    setRouteDescription('');
    setRouteCoordinates([]);
  };

  return (
    <div className={styles.container}>
      <h1>Add Route</h1>
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
          <MapComponent onMapClick={handleMapClick} routeCoordinates={routeCoordinates} />
          <div className={styles.coordinatesSection}>
            {routeCoordinates.map((coord, idx) => (
              <div key={idx} className={styles.coordinate}>
                {coord && typeof coord.lat === 'number' && typeof coord.lng === 'number' ? (
                  `Point ${idx + 1}: Lat: ${coord.lat.toFixed(6)}, Lng: ${coord.lng.toFixed(6)}`
                ) : (
                  'Invalid coordinates'
                )}
                <button type="button" onClick={() => removeCoordinate(idx)} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}
