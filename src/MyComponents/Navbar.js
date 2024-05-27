import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Assets/logo.png';
import './styling/navbar.css';

const NavBar = ({ onLoginClick, onSignUpClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
        <ul className="menu">
          <li className="navbar-item"><Link to="/">Home</Link></li>
          <li className="navbar-item"><Link to="/about">About</Link></li>
          <li className="navbar-item"><Link to="/about">Chatbot</Link></li>
          <li className="navbar-item"><Link to="/about">Doctor Appointment</Link></li>
          <li className="navbar-item"><Link to="/about">Medicine Delivery</Link></li>
          <li className="navbar-item"><Link to="/about">Contact Us</Link></li>
        </ul>
        <div className="navbar-auth">
          <button className="button" onClick={onSignUpClick}>Sign Up</button>
          <button className="button" onClick={onLoginClick}>Login</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
