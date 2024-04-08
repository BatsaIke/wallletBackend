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
    
      
    if (event === 'charge.success' && data && data.reference) {
        const filter = { reference: data.reference };
        const update = { status: 'successful' };
    
        try {
            let doc = await PaymentSession.findOneAndUpdate(filter, update, { new: true });
    
            if (doc) {
                console.log(`Payment status updated successfully for reference: ${data.reference}`);
                // Optionally, you can send a response back to acknowledge the successful processing of the webhook
                res.status(200).send('Webhook processed successfully');
            } else {
                console.error(`No payment session found for reference: ${data.reference}`);
                res.status(404).send('Payment session not found');
            }
        } catch (error) {
            console.error(`Error processing webhook for reference ${data.reference}: `, error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        // Handle other events or ignore them
        res.status(200).send('Event ignored');
    }
}

module.exports = {
    handlePaystackWebhook,
};