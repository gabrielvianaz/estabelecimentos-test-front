import { useState, useRef, useMemo, useEffect } from 'react';
import { Marker } from 'react-leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

function DraggableMarker({ markerPosition }) {
  const center = {
    lat: markerPosition[0],
    lng: markerPosition[1],
  };
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  useEffect(() => {
    const { lat, lng } = position;
    fetch(
      `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json?key=e299rwXhsQwkn8JZObN03HvAf5Wl2aBC&radius=100`
    )
      .then((r) => r.json())
      .then(({ addresses }) =>
        console.log(addresses[0].address.freeformAddress)
      );
  }, [position]);

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    ></Marker>
  );
}

export default DraggableMarker;
