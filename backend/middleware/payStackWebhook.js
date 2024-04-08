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
    if (event === 'charge.success') {
        const { reference } = data;
        console.log(`Webhook reference: ${data.reference}`);
        try {
            const paymentSession = await PaymentSession.findOneAndUpdate(
                { reference },
                { $set: { status: 'successful' }},
                { new: true }
            );
            console.log(`Webhook reference: ${paymentSession.reference}`);

            if (paymentSession) {
                console.log(`Payment status updated successfully for reference: ${reference}`);
                res.status(200).send('Webhook processed successfully');
            } else {
                console.error(`No payment session found for reference: ${reference}`);
                res.status(404).send('Payment session not found');
            }
        } catch (error) {
            console.error(`Error processing webhook for reference ${reference}: `, error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        // Handle other events or ignore them
        res.status(200).send('Event ignored');
    }
};

module.exports = {
    handlePaystackWebhook,
};