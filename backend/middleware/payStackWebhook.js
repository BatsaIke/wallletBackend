const crypto = require('crypto');
const PaymentSession = require('../model/PaymentSessionModel');
const dotenv = require("dotenv");
dotenv.config();

const handlePaystackWebhook = async (req, res) => {
    console.log("Webhook received event");
    const { event, data } = req.body;
    const signature = req.headers['x-paystack-signature'];
    const secret = process.env.PAYSTACK_KEY;

    // Verify Paystack signature
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash !== signature) {
        console.error('Invalid signature');
        return res.status(401).send('Invalid signature');
    }

    // Process the successful payment event
    if (event === 'charge.success' && data && data.reference) {
        console.log(`Webhook reference: ${data.reference}`);
        try {
            // Attempt to update the payment session's status
            const paymentSession = await PaymentSession.findOneAndUpdate(
                { reference: data.reference }, // Filter by reference
                { $set: { status: 'successful' }}, // Update the status
                { new: true } // Return the updated document
            );

            if (paymentSession) {
                console.log(`Database reference: ${paymentSession.reference}`);
                console.log(`Payment status updated successfully for reference: ${data.reference}`);
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
        console.log('Event ignored or missing data');
        res.status(200).send('Event ignored or missing data');
    }
};

module.exports = {
    handlePaystackWebhook,
};

