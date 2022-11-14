import React from 'react';
import axios from 'axios';
import Estabelecimentos from '../Components/Home/Estabelecimentos';
import { Animated } from 'react-animated-css';
import { useNavigate } from 'react-router-dom';
import styles from '../Assets/Styles/Home.module.css';
import Spinner from '../Components/Spinner';

const Home = () => {
  const [tokenOk, setTokenOk] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.token) {
      setLoading(true);
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
        .then(() => {
          setLoading(false);
          setTokenOk(true);
        })
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
      {loading && (
        <div className={styles.container}>
          <h1 className="tituloVerde">Meus estabelecimentos</h1>
          <div className={styles.spinner}>
            <Spinner />
          </div>
        </div>
      )}
      {tokenOk && (
        <Animated>
          <Estabelecimentos />
        </Animated>
      )}
    </>
  );
};

export default Home;
