
'use client'; 

import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './map.module.css';
// import MySvg from '/public/mybussvg.svg'; 






// Custom marker icon
const customIcon = L.icon({
  iconUrl: '/mybussvg.svg', // Adjust the path based on your actual file name and location
  iconSize: [100, 100], // Width and height of the icon
  iconAnchor: [50, 57], // Position of the icon anchor (relative to the top left corner of the icon)
});

const MapComponent = () => {
  const [positions, setPositions] = useState([]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (positions.length < 20) {
          setPositions([...positions, e.latlng]);
        }
      }
    });
    return null;
  };

  const removePosition = (index) => {
    setPositions(positions.filter((_, i) => i !== index));
  };

  const resetMap = () => {
    setPositions([]);
  };

  return (
    <div>
      <MapContainer center={[35.12011041069839, 33.94002914428712]} zoom={13} className={styles.mapContainer}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {positions.map((position, idx) => (
          <Marker key={idx} position={position} icon={customIcon}></Marker>
        ))}
        <Polyline positions={positions} color="blue" />
        <MapClickHandler />
      </MapContainer>
      <div className={styles.controls}>
        <button onClick={resetMap} className={styles.resetButton}>Reset Map</button>
        {positions.map((pos, idx) => (
          <div key={idx} className={styles.coordinate}>
            {`Lat: ${pos.lat}, Lng: ${pos.lng}`}
            <button onClick={() => removePosition(idx)} className={styles.removeButton}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapComponent;
