

import React, { useState } from 'react';
import NavBar from './Navbar';
import Login from './Login';
import SignUp from './Signup'; // Ensure the path is correct
import './style.css';

const MainHome = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  return (
    <div className="main-home">
      <NavBar onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick} />
      <h1>Welcome to Our Service</h1>
      <p>This is the main content of the home page.</p>
      {showLoginModal && <Login isOpen={showLoginModal} onClose={handleModalClose} />}
      {showSignUpModal && <SignUp isOpen={showSignUpModal} onClose={handleModalClose} />}
    </div>
  );
};

export default MainHome;