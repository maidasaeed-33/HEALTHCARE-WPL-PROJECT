import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './Styling/login.css';
import icon from './Assets/permission.png';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

const Login = ({ isOpen, onClose, onSignUpClick }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let username = '';
    let password = '';

    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const passwordInput = document.querySelector('input[placeholder="Password"]');

    if (usernameInput && passwordInput) {
      username = usernameInput.value;
      password = passwordInput.value;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password
      });
      console.log(response.data);
      setError(null);
      setSuccess(response.data.message);

      // Redirect to the current page after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        onClose(); // Close the modal
        window.location.reload(); // Reload the current page
      }, 2000);
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred during login.');
      }
      setSuccess(null);
    }
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
            <div className="form-group">
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
              {error && <div className="error">{error}</div>}
            </div>
            <div className="checkbox">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember"> Remember me </label>
            </div>
            {success && <div className="success">{success}</div>}
            <div className="login-btn">
              <button type="submit">Login</button>
            </div>
            <div id="text">
              Don't have an Account?
              <button type="button" className="link-button" onClick={onSignUpClick}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
