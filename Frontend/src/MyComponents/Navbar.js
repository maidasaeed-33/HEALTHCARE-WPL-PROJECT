import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './Assets/logo.png';
import HamburgerMenu from './HamburgerMenu';
import Login from './Login';
import SignUp from './Signup';
import './Styling/navbar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible((prevScrollPos > currentScrollPos && prevScrollPos > 0) || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleLoginClick = () => setShowLoginModal(true);
  const handleSignUpClick = () => setShowSignUpModal(true);
  const handleModalClose = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

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
            <Link to="/chatbot">Chatbot</Link>
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
            <button className="button" onClick={handleLoginClick}>
              Login
            </button>
            <button className="button" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </ul>
      </div>
      {showLoginModal && (
        <Login
          isOpen={showLoginModal}
          onClose={handleModalClose}
          onSignUpClick={handleSignUpClick}
        />
      )}
      {showSignUpModal && (
        <SignUp
          isOpen={showSignUpModal}
          onClose={handleModalClose}
        />
      )}
    </nav>
  );
};

export default NavBar;
