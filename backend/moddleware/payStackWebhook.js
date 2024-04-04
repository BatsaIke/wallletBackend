// middlewares/paystackWebhook.js
const crypto = require('crypto');

const handlePaystackWebhook = (req, res) => {
    const event = req.body;
    const signature = req.headers['x-paystack-signature'];
    const secret = process.env.PAYSTACK_SECRET_KEY;

    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(event)).digest('hex');
    if (hash !== signature) {
        return res.status(401).send('Invalid signature');
    }

    // Log or process the event here
    console.log('Event received:', event);

    // Acknowledge the event immediately
    res.send(200);
};

module.exports = handlePaystackWebhook;
