import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Assets/logo.png';
import './style.css';

const NavBar = ({ onLoginClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
        <ul className="menu">
          <li className="navbar-item"><Link to="/">Home</Link></li>
          <li className="navbar-item"><Link to="/about">About</Link></li>
          <li className="navbar-item">Chatbot</li>
          <li className="navbar-item">Doctor Appointment</li>
          <li className="navbar-item">Medicine Delivery</li>
          <li className="navbar-item">Contact Us</li>
        </ul>
        <div className="navbar-auth">
          <button className="button">Sign Up</button>
          <button className="button" onClick={onLoginClick}>Login</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
