import React from 'react';
import axios from 'axios';
import Estabelecimentos from '../Components/Home/Estabelecimentos';
import { Animated } from 'react-animated-css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [tokenOk, setTokenOk] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.token) {
      axios
        .post(
          'https://estabelecimentos-back.herokuapp.com/verificar',
          {},
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        )
        .then(() => setTokenOk(true))
        .catch(() => {
          localStorage.clear();
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <>
      {tokenOk && (
        <Animated>
          <Estabelecimentos />
        </Animated>
      )}
    </>
  );
};

export default Home;
