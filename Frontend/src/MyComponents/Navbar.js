import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to connect to Redux store
import logo2 from './Assets/logo2.png';
import HamburgerMenu from './HamburgerMenu';
import Login from './Login';
import SignUp from './Signup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Styling/navbar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

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
        <div className="navbar-right">
          <NavLink to="/cart" className="cart-link">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>} {/* Display the number of items */}
          </NavLink>
          <HamburgerMenu toggleMenu={toggleMenu} isOpen={isOpen} />
        </div>

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
