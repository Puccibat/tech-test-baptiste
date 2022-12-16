const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1hr' });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (user.rows.length !== 0) {
      const user_id = user.rows[0]._id;
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (!validPassword) {
        return res.status(401).json('Password incorrect');
      }

      const token = createToken(user_id);

      return res.status(200).json({ username, token, user_id });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, hash]
      );

      const newUser_id = newUser.rows[0]._id;

      const token = createToken(newUser_id);

      return res.status(200).json({ username, token, newUser_id });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT username, _id FROM users');

    return res.status(200).json(users.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { loginUser, getUsers };
