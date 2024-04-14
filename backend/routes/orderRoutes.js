const express = require('express');
const { check } = require('express-validator');
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, updateOrderStatus } = require('../controller/orderController');
const router = express.Router();
const softAuth = require('../middleware/softAuth');
const auth = require('../middleware/auth');
const checkRole = require('../utils/checkRole');

// Add validation checks for creating and updating orders
router.post(
  '/',softAuth,
  [
    check('items', 'Items are required and must not be empty').not().isEmpty(),
    check('deliveryContact', 'Delivery contact is required').not().isEmpty(),
    check('deliveryLocation', 'Delivery location is required').not().isEmpty(),
    check('totalAmount', 'Total amount is required and must be a number').isNumeric()
  ],
  createOrder
);

router.put('/:id/status',auth, checkRole(['admin']), updateOrderStatus);
router.get('/', auth, checkRole(['admin', 'moderator']), getOrders);
router.get('/:id', auth, checkRole(['admin', 'moderator']), getOrderById);
router.put('/:id',auth, checkRole(['admin']), updateOrder);
router.delete('/:id',auth, checkRole(['admin']), deleteOrder);

module.exports = router;
