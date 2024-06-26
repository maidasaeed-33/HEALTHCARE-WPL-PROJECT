import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';
import Login from './Login';
import SignUp from './Signup';
import './Styling/mainhome.css';
import medicine from './Assets/medicine.jpg';
import chatbot from './Assets/chatbot.png';
import Footer from './footer';


const MainHome = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleLoginClick = () => setShowLoginModal(true);
  const handleSignUpClick = () => {
    setShowSignUpModal(true);
    setShowLoginModal(false); // Close the Login modal when opening SignUp modal
  };
  const handleModalClose = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  return (
    <div className="main-home">
      <NavBar/>
      <section className="section">
        <div className="content">
          <h1>Making Expert Healthcare For All</h1>
          <p>Your health is our priority. Get the best care from our experts.</p>
          <button className="button-home" onClick={handleLoginClick}>Get Started</button>
        </div>
      </section>
      <section className="services-section">
        <div className="services">
          <div className="service-card">
            <img src="https://cdn.pixabay.com/photo/2021/11/20/03/16/doctor-6810750_960_720.png" alt="Doctor Appointment" className="service-image" />
            <h3>Doctor Appointment</h3>
            <p>Book appointments with top doctors at your convenience.</p>
          </div>
          <div className="service-card">
            <img src={medicine} alt="Medicine Delivery" className="service-image" />
            <h3>Medicine Delivery</h3>
            <p>Get your medications delivered to your doorstep.</p>
          </div>
          <div className="service-card">
            <img src={chatbot} alt="24/7 Support" className="service-image" />
            <h3>24/7 Support</h3>
            <p>Access round-the-clock support for any medical queries.</p>
          </div>
        </div>
      </section>
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Have any questions? Reach out to us anytime.</p>
        <button className="contact-button"><Link style={{ textDecoration: 'none',outline: 'none',color: 'white' }} to="/contact">Contact Us</Link></button>
      </section>

    
      <Footer />
      {showLoginModal && <Login isOpen={showLoginModal} onClose={handleModalClose} onSignUpClick={handleSignUpClick} />}
      {showSignUpModal && <SignUp isOpen={showSignUpModal} onClose={handleModalClose} />}
    </div>
  );
};

export default MainHome;
