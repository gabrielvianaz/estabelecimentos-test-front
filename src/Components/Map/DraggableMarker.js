import { useState, useRef, useMemo, useEffect } from 'react';
import { Marker } from 'react-leaflet';
import { iconeResidencia, iconeComercio, iconeParque } from './icones.js';

const DraggableMarker = ({
  markerPosition,
  estabelecimento,
  setEstabelecimento,
}) => {
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
          const coordenadas = marker.getLatLng();
          setEstabelecimento({
            ...estabelecimento,
            latitude: coordenadas.lat,
            longitude: coordenadas.lng,
          });
        }
      },
    }),
    []
  );
  const [icone, setIcone] = useState(iconeResidencia);

  useEffect(() => {
    if (estabelecimento.tipo === 'r') setIcone(iconeResidencia);
    else if (estabelecimento.tipo === 'c') setIcone(iconeComercio);
    else if (estabelecimento.tipo === 'p') setIcone(iconeParque);
  }, [estabelecimento.tipo]);

  return (
    <>
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        tipo={estabelecimento.tipo}
        icon={icone}
      ></Marker>
    </>
  );
};

export default DraggableMarker;
