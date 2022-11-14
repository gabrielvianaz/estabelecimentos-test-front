import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Assets/Styles/Footer.css';

const Footer = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/cadastro' && (
        <footer>
          <p>
            Desenvolvido por:{' '}
            <a href="https://github.com/gabrielvianaz">Gabriel Viana</a>
          </p>
        </footer>
      )}
    </>
  );
};

export default Footer;
