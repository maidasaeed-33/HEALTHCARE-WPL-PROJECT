import React, { useState } from 'react';
import NavBar from './Navbar'; // Ensure the path is correct
import Login from './Login'; // Ensure the path is correct
import './style.css'; // Ensure the path is correct

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
