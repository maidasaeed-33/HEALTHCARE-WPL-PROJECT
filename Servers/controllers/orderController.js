const db = require('../models/database');

exports.placeOrder = (req, res) => {
    const { customer_name, phone_number, email, address, country, city, items, total_price } = req.body;

    const insertOrderQuery = `
    INSERT INTO orders (customer_name, phone_number, email, address, country, city, items, total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(
        insertOrderQuery,
        [customer_name, phone_number, email, address, country, city, JSON.stringify(items), total_price],
        (err, result) => {
            if (err) {
                console.error('Error placing order:', err);
                res.status(500).send('Error placing order');
            } else {
                res.status(200).send('Order placed successfully');
            }
        }
    );
};
