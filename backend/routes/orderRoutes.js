const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');
const { orderLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .post(orderLimiter, createOrder)
  .get(protect, admin, getOrders);

router.route('/:id')
  .get(getOrderById);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

router.route('/:id')
  .delete(protect, admin, deleteOrder);

module.exports = router;
