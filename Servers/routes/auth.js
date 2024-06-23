const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const appointmentController = require('../controllers/appointmentController');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/validate', authController.validateForm); // Add this line
router.post('/book', appointmentController.bookAppointment);

module.exports = router;

