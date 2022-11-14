import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Assets/Styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
      {location.pathname != '/login' && location.pathname != '/cadastro' && (
        <nav>
          <Link to="/">Home</Link>
          <p onClick={handleClick}>Sair</p>
        </nav>
      )}
    </>
  );
};

export default Navbar;
