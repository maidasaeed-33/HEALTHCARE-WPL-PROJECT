const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'maida#123',
  database: 'healthcare'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  } else {
    console.log('Connected to the MySQL database.');
    createUsersTable();
    createAppointmentsTable();
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
  const createAppointmentsTableQuery = `
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      doctorId INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      FOREIGN KEY (doctorId) REFERENCES doctors(id)
    )
  `;

  db.query(createAppointmentsTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating appointments table:', err);
    } else {
      console.log('Appointments table created successfully.');
    }
  });
}

module.exports = db;
