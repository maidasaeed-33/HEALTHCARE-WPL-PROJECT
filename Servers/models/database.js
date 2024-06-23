const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'healthcare'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return; // Exit the function if there's an error
  } else {
    console.log('Connected to the MySQL database.');
    createUsersTable(); // Call function to create users table
  }
});

function createUsersTable() {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;

  db.query(createUserTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table created successfully.');
    }
  });
}

function createAppointmentsTable() {
  const createAppointmentTableQuery = `
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      doctor_id INT NOT NULL,
      doctor_name VARCHAR(255) NOT NULL,
      doctor_specialty VARCHAR(255) NOT NULL,
      patient_name VARCHAR(255) NOT NULL,
      patient_email VARCHAR(255) NOT NULL,
      appointment_date DATE NOT NULL,
      appointment_time TIME NOT NULL
    )
  `;

  db.query(createAppointmentTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating appointments table:', err);
    } else {
      console.log('Appointments table created successfully.');
    }
  });
}

// Call this function after connecting to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  } else {
    console.log('Connected to the MySQL database.');
    createUsersTable();
    createAppointmentsTable(); // Add this line
  }
});

module.exports = db;