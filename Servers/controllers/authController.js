const bcrypt = require('bcrypt');
const db = require('../models/database');
const { validateSignup, validateLogin } = require('../validators/authValidator');



exports.login = async (req, res) => {
  const { username, password } = req.body;

  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const query = 'SELECT * FROM users WHERE username = ?'; // Query using username
    const [rows] = await db.promise().query(query, [username]);
    if (rows.length === 0) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    res.send({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
};

exports.signup = async (req, res) => {
  const { name, email, password, username, confirmPassword } = req.body;

  console.log('Received data:', req.body);

  const { error } = validateSignup({ name, email, password, username, confirmPassword });
  if (error) {
    // ... (existing code)
  }

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Hashed password:', hashedPassword);

    // Insert the user into the database
    const query = 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [name, email, username, hashedPassword]);

    if (result.affectedRows > 0) {
      res.send({ message: 'Signed up successfully' });
    } else {
      res.status(500).send({ message: 'Error signing up' });
    }
  } catch (error) {
    console.error('Error during signup:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      const field = error.sqlMessage.match(/\'(.*?)\'/)[1];
      const message = `${field} already exists`;
      res.status(400).send({ [field]: message });
    } else {
      res.status(500).send({ message: 'Error signing up', error: error.message });
    }
  }
};

exports.validateForm = async (req, res) => {
  const { name, email, password, username, confirmPassword } = req.body;

  const { error } = validateSignup({ name, email, password, username, confirmPassword });
  if (error) {
    const errors = {};
    error.details.forEach(detail => {
      if (detail.path[0] === 'email') {
        errors.email = detail.message;
      } else if (detail.path[0] === 'username') {
        errors.username = detail.message;
      } else if (detail.path[0] === 'password') {
        errors.password = detail.message;
      } else if (detail.path[0] === 'confirmPassword') {
        errors.confirmPassword = detail.message;
      } else {
        errors.general = detail.message;
      }
    });
    return res.status(400).send(errors);
  }

  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
    if (rows.length > 0) {
      const errors = {};
      rows.forEach(row => {
        if (row.email === email) {
          errors.email = 'Email already exists';
        }
        if (row.username === username) {
          errors.username = 'Username already exists';
        }
      });
      return res.status(400).send(errors);
    }

    return res.status(200).send({ message: 'Form data is valid' });
  } catch (error) {
    console.error('Error during validation:', error);
    res.status(500).send({ message: 'Error validating form data', error: error.message });
  }
};