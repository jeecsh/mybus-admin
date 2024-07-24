import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.icon({
    iconUrl: '/mybussvg.svg', // Adjust the path based on your actual file name and location
    iconSize: [100, 100], // Width and height of the icon
    iconAnchor: [50, 57], // Position of the icon anchor (relative to the top left corner of the icon)
});

export default function MapComponent({ center, onMapClick }) {
  const MapClickHandler = () => {
    useMapEvents({
      click: onMapClick,
    });
    return null;
  };

  return (
    <MapContainer center={center} zoom={13} style={{ height: '300px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} icon={customIcon} />
      <MapClickHandler />
    </MapContainer>
  );
}
