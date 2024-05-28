import React from 'react';
import picture from './Assets/doc.png';
import './styling/about.css';
import Nav from './Nav';
import { FaArrowAltCircleRight } from "react-icons/fa";

function About() {
  return (
    <>
      {/* <Nav /> */}
      <h1>About Us</h1>
      <div className="about-container">
        <div className="left">
          <div className="heading">We provide high-quality healthcare services</div>
          <div className="para">
            At Pak-Medical, we are dedicated to providing accessible and high-quality healthcare services to everyone. Our platform leverages advanced technology to connect patients with best healthcare providers from the comfort of their own homes.
          </div>
          <div className="bullet">
            <ul>
              <li><FaArrowAltCircleRight className="icon" />&nbsp; Schedule appointments with professional doctors</li>
              <li><FaArrowAltCircleRight className="icon" />&nbsp; Provides nearby health resources</li>
              <li><FaArrowAltCircleRight className="icon" />&nbsp; Refill prescriptions easily and order medications for delivery</li>
              <li><FaArrowAltCircleRight className="icon" />&nbsp; Secure platform prioritizing safety and satisfaction</li>
            </ul>
          </div>
        </div>
        <div className="right">
          <img src={picture} alt="Doctor" />
        </div>
      </div>
    </>
  );
}

export default About;
