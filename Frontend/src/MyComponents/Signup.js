import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './Styling/signup.css';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

const SignUp = ({ isOpen, onClose }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/validate', formData);
      if (response.data.message === 'Form data is valid') {
        const signupResponse = await axios.post('http://localhost:3001/auth/signup', formData);
        console.log(signupResponse.data);
        setErrors({});
        setSuccess('Signed up successfully');
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 2000);
      } else {
        setErrors(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error('Error during signup:', error);
        setErrors({ general: 'An unexpected error occurred during signup.' });
      }
      setSuccess(null);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      const newErrors = { ...errors };
      delete newErrors.password;
      setErrors(newErrors);
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
      } else {
        const newErrors = { ...errors };
        delete newErrors.confirmPassword;
        setErrors(newErrors);
      }
    }
  };

  const handleBlur = async (event) => {
    const { name, value } = event.target;
    const formDataCopy = { ...formData, [name]: value };

    try {
      const response = await axios.post('http://localhost:3001/auth/validate', formDataCopy);
      if (response.data.message === 'Form data is valid') {
        setErrors({});
      } else {
        setErrors(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        const newErrors = {
          ...errors,
          ...serverErrors,
        };
        setErrors(newErrors);
      } else {
        console.error('Error during validation:', error);
        setErrors({ general: 'An unexpected error occurred during validation.' });
      }
    }
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
      overlayClassName="modal-overlay"
    >
      <div className="container">
        <div className="form">
          <FaTimes className="close-icon" onClick={onClose} />
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <FaUser className="left-icon" />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="field"
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="input-container">
              <FaUser className="left-icon" />
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="field"
              />
              {errors.username && <div className="error">{errors.username}</div>}
            </div>
            {errors.general && <div className="error general-error">{errors.general}</div>}

            <div className="input-container">
              <FaEnvelope className="left-icon" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="field"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="password-container">
              <div className="input-container">
                <FaLock className="left-icon" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="field"
                />
                {passwordVisible ? (
                  <FaEye className="right-icon" onClick={togglePasswordVisibility} />
                ) : (
                  <FaEyeSlash className="right-icon" onClick={togglePasswordVisibility} />
                )}
              </div>
              {errors.password && <div className="password-error">{errors.password}</div>}
            </div>
            <div className="password-container">
              <div className="input-container">
                <FaLock className="left-icon" />
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="field"
                />
                {confirmPasswordVisible ? (
                  <FaEye className="right-icon" onClick={toggleConfirmPasswordVisibility} />
                ) : (
                  <FaEyeSlash className="right-icon" onClick={toggleConfirmPasswordVisibility} />
                )}
              </div>
              {errors.confirmPassword && <div className="password-error">{errors.confirmPassword}</div>}
            </div>
            {success && <div className="success">{success}</div>}
            {errors.general && <div className="error">{errors.general}</div>}
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
