import React, { useState } from 'react';
import Modal from 'react-modal';
import icon from './Assets/permission.png';
import './Styling/login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

const Login = ({ isOpen, onClose, onSignUpClick }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here --- backend
    onClose(); // Close the modal after login
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="container">
        <div className="login">
          <FaTimes className="close-icon" onClick={onClose} />
          <img src={icon} alt="Icon" />
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <FaUser className="left-icon" />
              <input type="text" placeholder="Username" required className="field" />
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
                <FaEye className="right-icon" onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash className="right-icon" onClick={togglePasswordVisibility} />
              )}
            </div>
            <div className="checkbox">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember"> Remember me </label>
            </div>
            <div className="login-btn">
              <button type="submit">Login</button>
            </div>
            <div id="text">Don't have an Account? <a href="#" onClick={onSignUpClick}>Sign Up</a></div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
