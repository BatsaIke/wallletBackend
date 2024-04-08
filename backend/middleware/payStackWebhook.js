const crypto = require('crypto');
const PaymentSession = require('../model/PaymentSessionModel');
const dotenv = require("dotenv");
dotenv.config() 

const handlePaystackWebhook =async (req, res) => {
    console.log("webhook received event")
    const event = req.body;
    const signature = req.headers['x-paystack-signature'];
    const secret = process.env.PAYSTACK_KEY;

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
        // Find the document by reference and update its status
        const result = await PaymentSession.findOneAndUpdate(
            { reference }, // Filter by reference
            { $set: { status } }, // Update the status field
            { new: true } // Return the updated document
        );

        if (!result) {
            console.log(`No payment session found with reference ${reference}.`);
            return false;
        } else {
            console.log(`Payment session with reference ${reference} updated to status ${status}.`);
            return true;
        }
    } catch (error) {
        console.error(`Error updating payment status for reference ${reference}: `, error);
        throw error;
    }
}

module.exports = {
    handlePaystackWebhook,
    updatePaystackStatus,
};