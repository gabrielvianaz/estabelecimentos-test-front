import React from 'react';
import { useNavigate } from 'react-router-dom';
import Estabelecimentos from '../Components/Home/Estabelecimentos';

const Home = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.token) {
      navigate('/login');
    }
  });

  return <Estabelecimentos />;
};

export default Home;
