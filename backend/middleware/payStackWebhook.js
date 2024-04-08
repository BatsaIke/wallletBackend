const crypto = require('crypto');const PaymentSession = require('../model/PaymentSessionModel'); 

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
        const reference = event.data
        const even =event        
        console.log('Payment success for reference:', reference);

        // Update the payment status in your database
        updatePaystackStatus(reference, 'successful',even)
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



async function updatePaystackStatus(reference, status) {
    try {
        // Update the payment session with the new status
        await PaymentSession.findOneAndUpdate({ reference }, { $set: { status } });
        console.log(`Payment for reference ${reference} marked as ${status}`);
    } catch (error) {
        console.error(`Failed to update payment status for reference ${reference}:`, error);
    }
}

module.exports = {
    handlePaystackWebhook,
    updatePaystackStatus,
};