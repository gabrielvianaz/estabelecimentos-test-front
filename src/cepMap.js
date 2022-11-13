import React from 'react';
import 'leaflet/dist/leaflet.css';
import Map from './Components/Map/Map';

const cepMap = () => {
  const [cep, setCep] = React.useState('');
  const [coordenadas, setCoordenadas] = React.useState({});

  React.useEffect(() => {
    if (cep.length === 8) {
      fetch(
        `https://api.tomtom.com/search/2/structuredGeocode.json?key=e299rwXhsQwkn8JZObN03HvAf5Wl2aBC&countryCode=BR&postalCode=${cep}`
      )
        .then((r) => r.json())
        .then(({ results }) => {
          setCoordenadas({
            lat: results[0].position.lat,
            lng: results[0].position.lon,
          });
        });
    }
  }, [cep]);

  function handleChange({ target }) {
    setCep(target.value);
  }

  return (
    <div>
      <label htmlFor="CEP">CEP:</label>
      <input
        style={{ marginBottom: '30px' }}
        type="tel"
        maxLength="8"
        value={cep}
        onChange={handleChange}
      />
      {coordenadas.lat && <Map center={[coordenadas.lat, coordenadas.lng]} />}
    </div>
  );
};

export default cepMap;
