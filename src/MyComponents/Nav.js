

import React, { useState } from 'react';
import NavBar from './Navbar';
import Login from './Login';
import SignUp from './Signup'; 

const Nav = () => {
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
      {showLoginModal && <Login isOpen={showLoginModal} onClose={handleModalClose} onSignUpClick={handleSignUpClick} />}
      {showSignUpModal && <SignUp isOpen={showSignUpModal} onClose={handleModalClose} />}
    </div>
  );
};
export default Nav;
