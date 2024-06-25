const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const appointmentController = require('../controllers/appointmentController');
const orderController = require('../controllers/orderController');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/validate', authController.validateForm);
router.post('/book', appointmentController.bookAppointment);
router.post('/place-order', orderController.placeOrder);

module.exports = router;




