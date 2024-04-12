const express = require('express');
const { check } = require('express-validator');
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, updateOrderStatus } = require('../controller/orderController');
const router = express.Router();
const softAuth = require('../middleware/softAuth');
const auth = require('../middleware/auth');

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


router.put(
  '/update-status',
  updateOrderStatus
);
// Assuming no validation is needed for fetching orders
router.get('/',softAuth, getOrders);
router.get('/:id', getOrderById); 

// Assuming validation for updating orders might be similar to creating them, adjust as needed
router.put('/:id',auth, [
    // Similar validation as creating an order or specific to update requirements
  ], 
  updateOrder
);

router.delete('/:id',auth, deleteOrder);

module.exports = router;
