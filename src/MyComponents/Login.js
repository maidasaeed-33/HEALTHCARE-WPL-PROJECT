import React from 'react';
import Modal from 'react-modal';
import icon from './Assets/permission.png';
import './style.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const Login = ({ onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    onClose(); // Close the modal after login
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal"
    >
      <div className="container">
        <div className="login">
          <img src={icon} alt="Icon" />
          <form onSubmit={handleSubmit}>
            <div>
              <input type="text" placeholder="Username" required className='field'/>
              <FaUser className='icon'/>
            </div>
            <div>
              <input type="password" placeholder="Password" required className='field' />
              <FaLock className='icon'/>
            </div>
            <div className='checkbox'>
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember"> Remember me </label>
            </div>
            <button type="submit">Login</button>
            <div>Don't have an Account? <a href="#">Sign Up</a></div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
