import React from 'react';
import NavBar from './Navbar';
import './Styling/contact.css';
import Footer from './footer';
import emailjs from 'emailjs-com';

function Contact() {

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_kumw9en', 'template_46u4lql', e.target, 'Ah4UpYNa4buN6eE1U')
      .then((result) => {
        console.log(result.text);
        alert('Message sent successfully!');
      }, (error) => {
        console.log(error.text);
        alert('An error occurred, please try again.');
      });

    e.target.reset();
  };

  return (
    <>
      <NavBar />
      <div className="contact-page">
        <div className="contact-container">
          <h2>Get in touch</h2>
          <div className="form-info-container">
            <form className="contact-form" onSubmit={sendEmail}>
              <div className="form-group">
                <label htmlFor="name">Name </label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input type="text" id="name" name="from_name" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email </label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input type="email" id="email" name="from_email" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <div className="input-with-icon">
                  <i className="fas fa-phone"></i>
                  <input type="tel" id="phone" name="phone" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message </label>
                <textarea id="message" name="message" placeholder="Write your message" rows="5" required></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>We are here to help you 24/7 with any questions or concerns you may have. Please fill the form and we will get back to you as soon as possible.</p>
              <div className="info-details">
                <div className="detail">
                  <i className="fas fa-phone"></i>
                  <p>+1 (291) 939 9321</p>
                </div>
                <div className="detail">
                  <i className="fas fa-envelope"></i>
                  <p>info@mywebsite.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
