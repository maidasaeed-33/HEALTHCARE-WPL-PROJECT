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
        try {
          const signupResponse = await axios.post('http://localhost:3001/auth/signup', formData);
          console.log(signupResponse.data);
          setErrors({});
          setSuccess('Signed up successfully');
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 2000);
        } catch (signupError) {
          if (signupError.response && signupError.response.data) {
            if (signupError.response.data.email) {
              setErrors(prevErrors => ({ ...prevErrors, email: signupError.response.data.email }));
            } else {
              setErrors(signupError.response.data);
            }
          } else {
            console.error('Error during signup:', signupError);
            setErrors({ general: 'An unexpected error occurred during signup.' });
          }
        }
      } else {
        setErrors(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error('Error during validation:', error);
        setErrors({ general: 'An unexpected error occurred during validation.' });
      }
      setSuccess(null);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
      }
    }
  };

  const handleBlur = async (event) => {
    const { name, value } = event.target;
    if (!value) return;

    const formDataCopy = { ...formData, [name]: value };

    try {
      const response = await axios.post('http://localhost:3001/auth/validate', formDataCopy);
      if (response.data.message === 'Form data is valid') {
        setErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      } else {
        setErrors(prevErrors => ({ ...prevErrors, ...response.data }));
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(prevErrors => ({ ...prevErrors, ...error.response.data }));
      } else {
        console.error('Error during validation:', error);
        setErrors(prevErrors => ({ ...prevErrors, general: 'An unexpected error occurred during validation.' }));
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
      className="signup-modal"
      overlayClassName="signup-modal-overlay"
    >
      <div className="signup-container">
        <div className="signup-form">
          <FaTimes className="signup-close-icon" onClick={onClose} />
          <form onSubmit={handleSubmit}>
            <div className="signup-input-container">
              <div className="signup-field-wrapper">
                <FaUser className="signup-icon signup-left-icon" />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="signup-field"
                />
              </div>
              {errors.name && <div className="signup-error">{errors.name}</div>}
            </div>
            <div className="signup-input-container">
              <div className="signup-field-wrapper">
                <FaUser className="signup-icon signup-left-icon" />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="signup-field"
                />
              </div>
              {errors.username && <div className="signup-error">{errors.username}</div>}
            </div>
            <div className="signup-input-container">
              <div className="signup-field-wrapper">
                <FaEnvelope className="signup-icon signup-left-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="signup-field"
                />
              </div>
              {errors.email && <div className="signup-error">{errors.email}</div>}
            </div>
            <div className="signup-input-container">
              <div className="signup-field-wrapper">
                <FaLock className="signup-icon signup-left-icon" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="signup-field"
                />
                {passwordVisible ? (
                  <FaEye className="signup-icon signup-right-icon" onClick={togglePasswordVisibility} />
                ) : (
                  <FaEyeSlash className="signup-icon signup-right-icon" onClick={togglePasswordVisibility} />
                )}
              </div>
              {errors.password && <div className="signup-error">{errors.password}</div>}
            </div>
            <div className="signup-input-container">
              <div className="signup-field-wrapper">
                <FaLock className="signup-icon signup-left-icon" />
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="signup-field"
                />
                {confirmPasswordVisible ? (
                  <FaEye className="signup-icon signup-right-icon" onClick={toggleConfirmPasswordVisibility} />
                ) : (
                  <FaEyeSlash className="signup-icon signup-right-icon" onClick={toggleConfirmPasswordVisibility} />
                )}
              </div>
              {errors.confirmPassword && <div className="signup-error">{errors.confirmPassword}</div>}
            </div>
            {success && <div className="signup-success">{success}</div>}
            {errors.general && <div className="signup-error">{errors.general}</div>}
            <div className="signup-btn-container">
              <button type="submit" className="signup-btn">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SignUp;