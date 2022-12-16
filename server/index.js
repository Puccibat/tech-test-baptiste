require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = 4242;
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');

app.use(express.json());
app.use(cors());

app.get('/hello', (req, res) => {
  res.status(200).end();
});
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
