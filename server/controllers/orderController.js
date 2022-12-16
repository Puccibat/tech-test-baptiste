const pool = require('../db');

const expirationDate = new Date(new Date().setDate(new Date().getDate() + 14));

const createOrder = async (req, res) => {
  const { price, username } = req.body;

  console.log(expirationDate);

  try {
    const newOrder = await pool.query(
      'INSERT INTO orders (price, username, expirationDate) VALUES ($1, $2, $3) RETURNING *',
      [price, username, expirationDate]
    );

    res.status(200).json(newOrder.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json('An error occured, please try again or contact the admin');
  }
};

const getAll = async (req, res) => {
  try {
    const orders = await pool.query('SELECT * FROM orders');
    res.status(200).json(orders.rows);
  } catch (error) {
    res
      .status(500)
      .json('An error occured, please try again or contact the admin');
  }
};

const editOrder = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  try {
    const editedOrder = await pool.query(
      'UPDATE orders SET price = $1, expirationDate = $2 WHERE order_id = $3 RETURNING *',
      [price, expirationDate, id]
    );
    res.status(200).json(editedOrder.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json('An error occured, please try again or contact the admin');
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await pool.query(
      'DELETE FROM orders WHERE order_id = $1 RETURNING *',
      [id]
    );
    res.status(200).json(deletedOrder.rows);
  } catch (error) {
    res
      .status(500)
      .json('An error occured, please try again or contact the admin');
  }
};

module.exports = { getAll, createOrder, editOrder, deleteOrder };
