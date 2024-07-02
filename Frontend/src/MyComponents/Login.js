import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import './Styling/login.css';

const Login = ({ isOpen, onClose, onSignUpClick }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usernameInput = event.target.elements.username;
    const passwordInput = event.target.elements.password;

    const username = usernameInput ? usernameInput.value : '';
    const password = passwordInput ? passwordInput.value : '';

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password
      });
      setError(null);
      setSuccess(response.data.message);

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.response?.data?.message || 'An unexpected error occurred during login.');
      setSuccess(null);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal1"
      overlayClassName="modal-overlay"
    >
      <div className="login-container">
        <FaTimes className="close-icon" onClick={onClose} />
        <div className="login-header">

          <h2>Welcome Back</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-container">
              <FaUser className="input-icon" />
              <input className='Logininput' type="text" name="username" placeholder="Username" required />
            </div>
          </div>
          <div className="input-group">
            <div className="input-container">
              <FaLock className="input-icon" />
              <input className='Logininput'
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="checkbox-container">
            <label>
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account? <button onClick={onSignUpClick} className="signup-link">Sign Up</button>
        </p>
      </div>
    </Modal>
  );
};

export default Login;