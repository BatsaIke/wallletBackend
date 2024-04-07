const crypto = require('crypto');

const handlePaystackWebhook = (req, res) => {
    const event = req.body;
    const signature = req.headers['x-paystack-signature'];
    const secret = process.env.PAYSTACK_SECRET_KEY;

    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(event)).digest('hex');
    if (hash !== signature) {
        return res.status(401).send('Invalid signature');
    }

    // Process the successful payment event 
    if (event.event === 'charge.success') {
        const reference = event.data.reference;
        console.log('Payment success for reference:', reference);

        // Update the payment status in your database
        updatePaymentStatus(reference, 'successful')
          .then(() => res.send(200))
          .catch(err => {
            console.error('Failed to update payment status:', err);
            res.status(500).send('Failed to process event');
          });
    } else {
        // Acknowledge other events without processing
        res.send(200);
    }
};

// A mock function to illustrate updating payment status in the database
async function updatePaymentStatus(reference, status) {
    // Your database update logic here
    console.log(`Payment for ${reference} marked as ${status}`);
    // For example:
    // await db.collection('payments').updateOne({ reference }, { $set: { status } });
}

module.exports = {
    handlePaystackWebhook,
    updatePaymentStatus,
};