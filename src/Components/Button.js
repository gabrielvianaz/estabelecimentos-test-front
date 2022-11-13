import React from 'react';
import '../Assets/Styles/Button.css';

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
