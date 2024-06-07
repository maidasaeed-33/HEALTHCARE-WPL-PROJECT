import React, { useState } from 'react';
import NavBar from './Navbar';
import Login from './Login';
import SignUp from './Signup';
import './styling/home.css';

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
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Medical Services</h1>
          <p>Your health is our priority. Get the best care from our experts.</p>
          <button className="hero-button" onClick={handleLoginClick}>Get Started</button>
        </div>
      </section>
      <section className="services-section">
        <div className="services">
          <div className="service-card">
            <img src="https://images.unsplash.com/photo-1602230877990-6e1e0b8d2968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg1MTB8MHwxfGFsbHwxfHx8fHx8fHwxNjE4NzYxNzk1&ixlib=rb-1.2.1&q=80&w=400" alt="Doctor Appointment" className="service-image" />
            <h3>Doctor Appointment</h3>
            <p>Book appointments with top doctors at your convenience.</p>
          </div>
          <div className="service-card">
            <img src="https://images.unsplash.com/photo-1580281658623-18dc0de06b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400" alt="Medicine Delivery" className="service-image" />
            <h3>Medicine Delivery</h3>
            <p>Get your medications delivered to your doorstep.</p>
          </div>
          <div className="service-card">
            <img src="https://images.unsplash.com/photo-1530497610247-94d3c16cda28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg1MTB8MHwxfGFsbHwyfHx8fHx8fHwxNjE4NzYxNzk1&ixlib=rb-1.2.1&q=80&w=400" alt="24/7 Support" className="service-image" />
            <h3>24/7 Support</h3>
            <p>Access round-the-clock support for any medical queries.</p>
          </div>
        </div>
      </section>
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Have any questions? Reach out to us anytime.</p>
        <button className="contact-button">Contact Us</button>
      </section>
      <footer className="footer">
        <p>&copy; 2024 Our Medical Services. All rights reserved.</p>
      </footer>
      {showLoginModal && <Login isOpen={showLoginModal} onClose={handleModalClose} onSignUpClick={handleSignUpClick} />}
      {showSignUpModal && <SignUp isOpen={showSignUpModal} onClose={handleModalClose} />}
    </div>
  );
};


export default MainHome;
