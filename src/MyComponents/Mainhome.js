import React, { useState } from 'react';
import NavBar from './Navbar';
import Login from './Login';
import './style.css';

const MainHome = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="main-home">
      <NavBar onLoginClick={handleLoginClick} />
      <h1>Welcome to Our Service</h1>
      <p>This is the main content of the home page.</p>
      {showLoginModal && <Login onClose={handleModalClose} />}
    </div>
  );
};

export default MainHome;