import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import DraggableMarker from './DraggableMarker';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

import './Map.css';

const Map = ({ center }) => {
  return (
    <MapContainer center={center} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker markerPosition={center}></DraggableMarker>
      {/* <Marker
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
        position={[-14.837138860638376, -40.878174304962165]}
      /> */}
    </MapContainer>
  );
};

export default Map;
