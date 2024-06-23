const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.post('/create', (req, res) => {
  const { doctorId, name, email, date, time } = req.body;

  const query = 'INSERT INTO appointments (doctorId, name, email, date, time) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [doctorId, name, email, date, time], (err, results) => {
    if (err) {
      console.error('Error inserting appointment:', err);
      res.status(500).send('Error creating appointment');
    } else {
      res.status(200).send('Appointment created successfully');
    }
  });
});

module.exports = router;

