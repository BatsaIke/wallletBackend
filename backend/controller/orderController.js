const Order = require("../model/OrderModel");
const Product = require("../model/ProductModel");

exports.createOrder = async (req, res) => {
  console.log(req.body.items,"creating orders")
  const {
    items,
    deliveryContact,
    deliveryLocation,
    additionalInfo,
    totalAmount,
    quatity,
  } = req.body;



  // Create the base order object
  const orderData = {
    items,
    deliveryContact,
    deliveryLocation,
    additionalInfo,
    totalAmount,
    quatity,
  };

  // If the request comes from a registered user, add their ID to the order
  if (req.user) {
    orderData.user = req.user.id;
  }
  try {
    const newOrder = new Order(orderData);
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body; // Get status from the body
  const { id } = req.params; // Get orderId from URL parameters

  if (!id || !status) {
    return res.status(400).json({ message: 'Order ID and status are required.' });
  }

  try {
    // Find the order and update its status
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


exports.getOrders = async (req, res) => {
  try {
    // Use `.populate()` to fill in the product details from the 'Product' collection
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("items.product");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getOrderById = async (req, res) => {
  try {
    // Include .populate() to fill in the product details
    const order = await Order.findById(req.params.id).populate("items.product");

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


// // Example function to get a single order by ID and populate product details
// async function getOrderById(req, res) {
//   try {
//     const orderId = req.params.id; // Get order ID from request parameters
//     const order = await Order.findById(orderId)
//       .populate('items.product') // Populate the 'product' field within each item in the 'items' array
//       .exec(); // Execute the query

//     if (!order) {
//       return res.status(404).json({ message: "Order not found." });
//     }

//     res.json(order); // Send back the populated order
//   } catch (error) {
//     console.error(`Error fetching order by ID: `, error);
//     res.status(500).send('Internal Server Error');
//   }
// }

exports.updateOrder = async (req, res) => {
  // Update logic here
};

exports.deleteOrder = async (req, res) => {
  // Delete logic here
};
