const express = require('express');
const router = express.Router();

const {
  getAll,
  createOrder,
  editOrder,
  deleteOrder,
} = require('../controllers/orderController');

const { verifyUser } = require('../middleware/verifyUser');

router.post('/add', createOrder);

router.get('/orders', getAll);

router.put('/edit/:id', verifyUser, editOrder);

router.delete('/delete/:id', verifyUser, deleteOrder);

module.exports = router;
