import L from 'leaflet';

import residencia from '../../Assets/Images/residencia.svg';
import comercio from '../../Assets/Images/comercio.svg';
import parque from '../../Assets/Images/parque.svg';

const iconeResidencia = new L.Icon({
  iconUrl: residencia,
  iconSize: [35, 45],
});
const iconeComercio = new L.Icon({
  iconUrl: comercio,
  iconSize: [35, 45],
});
const iconeParque = new L.Icon({
  iconUrl: parque,
  iconSize: [35, 45],
});

export { iconeResidencia, iconeComercio, iconeParque };
