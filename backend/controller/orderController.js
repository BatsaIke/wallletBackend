const Order = require('../model/orderModel.js')
const Product = require('../model/ProductModel'); // Assuming you have a Product model


exports.createOrder = async (req, res) => {
  const { items, deliveryContact, deliveryLocation, additionalInfo, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id, // Assuming you have middleware to inject user ID
      items,
      deliveryContact,
      deliveryLocation,
      additionalInfo,
      totalAmount
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.updateOrder = async (req, res) => {
  // Update logic here
};

exports.deleteOrder = async (req, res) => {
  // Delete logic here
};
