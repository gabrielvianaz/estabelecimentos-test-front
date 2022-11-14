import { MapContainer, TileLayer } from 'react-leaflet';

import '../../Assets/Styles/Map.css';

const Map = ({ center, children }) => {
  return (
    <MapContainer center={center} zoom={17}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
