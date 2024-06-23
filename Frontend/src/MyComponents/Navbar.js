import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import logo from './Assets/logo.png';
import logo2 from './Assets/logo2.png';
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

  const handleLoginClick = () => setShowLoginModal(true);
  const handleSignUpClick = () => setShowSignUpModal(true);
  const handleModalClose = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  return (
    <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
      <div className="navbar-container">
        <NavLink to="/">
          <img src={logo2} alt="Logo" className="logo" />
        </NavLink>
        <HamburgerMenu toggleMenu={toggleMenu} isOpen={isOpen} />
        <ul className={`menu ${isOpen ? 'show' : ''}`}>
          <li className="navbar-item">
            <NavLink to="/" exact activeClassName="active">Home</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/about" activeClassName="active">About</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/chatbot" activeClassName="active">Chatbot</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/doctorappointment" activeClassName="active">Doctor Appointment</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/medicine" activeClassName="active">Medicine Delivery</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/contact" activeClassName="active">Contact Us</NavLink>
          </li>
          <div className="navbar-auth">
            <button className="button" onClick={handleLoginClick}>
              Login
            </button>
            <button className="button2" onClick={handleSignUpClick}>
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