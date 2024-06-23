import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Styling/AppointmentForm.css';

const AppointmentForm = () => {
  const { doctorId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/appointments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, doctorId }),
    })
    .then(response => response.text()) // Updated to response.text() to handle plain text responses
    .then(data => {
      alert(`Appointment made with Doctor ID: ${doctorId}`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="appointment-form-container">
      <form onSubmit={handleSubmit} className="appointment-form">
        <h2>Book an Appointment</h2>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
