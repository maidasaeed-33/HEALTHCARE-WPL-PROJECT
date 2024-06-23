const db = require('../models/database');

exports.bookAppointment = (req, res) => {
    const { doctorId, doctorName, doctorSpecialty, name, email, date, time } = req.body;

    const query = `
    INSERT INTO appointments 
    (doctor_id, doctor_name, doctor_specialty, patient_name, patient_email, appointment_date, appointment_time) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(query, [doctorId, doctorName, doctorSpecialty, name, email, date, time], (err, result) => {
        if (err) {
            console.error('Error booking appointment:', err);
            return res.status(500).json({ message: 'Error booking appointment' });
        }
        res.status(201).json({ message: 'Appointment booked successfully', appointmentId: result.insertId });
    });
};