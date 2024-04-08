const crypto = require('crypto');
const PaymentSession = require('../model/PaymentSessionModel');
const dotenv = require("dotenv");
dotenv.config();

const handlePaystackWebhook = async (req, res) => {
    console.log("Webhook received event");
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const { event, data } = req.body;
    const signature = req.headers['x-paystack-signature'];

    // Verify the Paystack signature
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash !== signature) {
        console.error('Invalid signature');
        return res.status(401).send('Invalid signature');
    }

    if (event === 'charge.success' && data?.reference) {
        console.log(`Webhook reference: ${data.reference}`);

        // Find the session in the database by reference
        const existingSession = await PaymentSession.findOne({ reference: data.reference });
        if (existingSession) {
            console.log(`Database reference: ${existingSession.reference}`);
        } else {
            console.log(`No session found for reference: ${data.reference}`);
            return res.status(404).send('Session not found');
        }

        const filter = { reference: data.reference };
        const update = { status: 'successful' };

        try {
            const updatedSession = await PaymentSession.findOneAndUpdate(filter, update, { new: true });

            if (updatedSession) {
                console.log(`Payment status updated successfully for reference: ${data.reference}`);
                res.status(200).send('Webhook processed successfully');
            } else {
                console.error(`Failed to update session for reference: ${data.reference}`);
                res.status(500).send('Failed to update payment status');
            }
        } catch (error) {
            console.error(`Error processing webhook for reference ${data.reference}: `, error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        console.log('Event ignored');
        res.status(200).send('Event ignored');
    }
};

module.exports = {
    handlePaystackWebhook,
};
