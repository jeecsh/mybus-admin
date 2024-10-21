"use client"
import { MapContainer, TileLayer, Marker, Popup, Tooltip,useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define the custom icon for the marker
const customIcon = L.icon({
  iconUrl: '/mybussvg.svg', // Adjust the path based on your actual file name and location
  iconSize: [100, 100], // Width and height of the icon
  iconAnchor: [50, 50], // Position of the icon anchor (relative to the top left corner of the icon)
});

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: onMapClick,
  });
  return null;
};

export default function MapComponent({ center, onMapClick, busStations }) {
  // Fallback center in case center is null or undefined
  const defaultCenter = [35.12011041069839, 33.94002914428712];

  // Function to transform loc object to [lat, lng]
  const transformLoc = (loc) => {
    if (loc) {
      return [loc._latitude, loc._longitude];
    }
    return null;
  };

  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: '300px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center || defaultCenter} icon={customIcon} />
      <MapClickHandler onMapClick={onMapClick} />
      {busStations.map(station => {
        const position = transformLoc(station.loc);
        if (position) {
          return (
            <Marker key={station.id} position={position} icon={customIcon}>
              <Popup>{station.name}</Popup>
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                <div>
                  <strong>ID:</strong> {station.id}
                </div>
              </Tooltip>
            </Marker>
          );
        } else {
          console.error(`Invalid location data for station ${station.id}`);
          return null; // Skip rendering the marker if location data is invalid
        }
      })}
    </MapContainer>
  );
}
