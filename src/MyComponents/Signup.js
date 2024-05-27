import React, { useState } from 'react';
import Modal from 'react-modal';
import './styling/signup.css';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = ({ isOpen, onClose }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    onClose(); // Close the modal after sign-up
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal"
    >
      <div className="container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <FaUser className="left-icon" />
              <input type="text" placeholder="Username" required className="field" />
            </div>
            <div className="input-container">
              <FaEnvelope className="left-icon" />
              <input type="email" placeholder="Email" required className="field" />
            </div>
            <div className="input-container">
              <FaLock className="left-icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                required
                className="field"
              />
              {passwordVisible ? (
                <FaEyeSlash className="right-icon" onClick={togglePasswordVisibility} />
              ) : (
                <FaEye className="right-icon" onClick={togglePasswordVisibility} />
              )}
            </div>
            <div className="input-container">
              <FaLock className="left-icon" />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className="field"
              />
              {confirmPasswordVisible ? (
                <FaEyeSlash className="right-icon" onClick={toggleConfirmPasswordVisibility} />
              ) : (
                <FaEye className="right-icon" onClick={toggleConfirmPasswordVisibility} />
              )}
            </div>
            <div className="checkbox">
              <input type="checkbox" name="terms" id="terms" required />
              <label htmlFor="terms"> I agree to terms and conditions</label>
            </div>
            <div className="form-btn">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SignUp;