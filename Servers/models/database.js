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

module.exports = db;