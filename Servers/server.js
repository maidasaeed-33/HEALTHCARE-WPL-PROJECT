const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/auth');
const orderRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/orders', orderRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(3001, '0.0.0.0', () => {
  console.log('Server started on port 3001');
});
