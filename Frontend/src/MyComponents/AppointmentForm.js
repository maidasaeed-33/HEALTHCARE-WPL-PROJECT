import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Styling/AppointmentForm.css';

const AppointmentForm = () => {
  const { doctorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });
  const [isBooked, setIsBooked] = useState(false);

  const query = new URLSearchParams(location.search);
  const doctorName = query.get('name');
  const doctorSpecialty = query.get('specialty');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId,
          doctorName,
          doctorSpecialty,
          ...formData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Appointment booked successfully! Appointment ID: ${result.appointmentId}`);
        setIsBooked(true);
      } else {
        alert('Error booking appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error booking appointment. Please try again.');
    }
  };

  const handleReturnToDoctors = () => {
    navigate('/doctorappointment'); // Adjust this path if your doctor list page has a different route
  };

  if (isBooked) {
    return (
      <div className="appointment-form-container">
        <div className="appointment-booked-message">
          <h2>Appointment Booked</h2>
          <p>Your appointment with {doctorName} has been successfully booked.</p>
          <p>Thank you for using our service!</p>
          <button onClick={handleReturnToDoctors} className="return-button">
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-form-container">
      <form onSubmit={handleSubmit} className="appointment-form">
        <h2>Book an Appointment</h2>
        <div className="doctor-info">
          <div className="doctor-name">Doctor: <span>{doctorName}</span></div>
          <div className="doctor-specialty">Specialty: <span>{doctorSpecialty}</span></div>
        </div>

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