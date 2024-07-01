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
  const [appointmentId, setAppointmentId] = useState(null);

  const query = new URLSearchParams(location.search);
  const doctorName = query.get('name');
  const doctorSpecialty = query.get('specialty');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedDoctorId = parseInt(doctorId, 10);

      if (isNaN(parsedDoctorId)) {
        throw new Error('Invalid doctor ID');
      }

      const response = await fetch('http://localhost:3001/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: parsedDoctorId,
          doctorName,
          doctorSpecialty,
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book appointment');
      }

      const result = await response.json();
      setAppointmentId(result.appointmentId);
      setIsBooked(true);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error booking appointment: ${error.message}`);
    }
  };

  const handleReturnToDoctors = () => {
    navigate('/doctorappointment');
  };

  if (isBooked) {
    return (
      <div className="appointment-form-container">
        <div className="appointment-booked-message">
          <h2>Appointment Booked</h2>
          <p>Your appointment with {doctorName} has been successfully booked.</p>
          <p>Appointment ID: {appointmentId}</p>
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

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button">Book Appointment</button>
          <button type="button" onClick={handleReturnToDoctors} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;