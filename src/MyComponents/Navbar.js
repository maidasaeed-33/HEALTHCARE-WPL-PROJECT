import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './Assets/logo.png';
import HamburgerMenu from './HamburgerMenu';
import './Styling/navbar.css';

const NavBar = ({ onLoginClick, onSignUpClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible((prevScrollPos > currentScrollPos && prevScrollPos > 0) || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
      <div className="navbar-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <HamburgerMenu toggleMenu={toggleMenu} isOpen={isOpen} />
        <ul className={`menu ${isOpen ? 'show' : ''}`}>
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about">About</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about">Chatbot</Link>
          </li>
          <li className="navbar-item">
            <Link to="/doctorappointment">Doctor Appointment</Link>
          </li>
          <li className="navbar-item">
            <Link to="/medicine">Medicine Delivery</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact">Contact Us</Link>
          </li>
          <div className="navbar-auth">

            <button className="button" onClick={onLoginClick}>
              Login
            </button>
            <button className="button" onClick={onSignUpClick}>
              Sign Up
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;