const crypto = require('crypto');
const PaymentSession = require('../model/PaymentSessionModel');
const dotenv = require("dotenv");
dotenv.config() 

const handlePaystackWebhook = async(req, res) => {
    console.log("webhook received event")
    const event = req.body;
    console.log(req.body,"bpdy oo")
    const signature = req.headers['x-paystack-signature'];
    const secret = process.env.PAYSTACK_KEY;

    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(event)).digest('hex');
    if (hash !== signature) {
        return res.status(401).send('Invalid signature');
    }

    // Process the successful payment event 
    if (event === 'charge.success') {
        const { reference } = data; // Extract reference from the data object
        try {
            // Update the payment session with the new status using the reference
            const updatedSession = await PaymentSession.findOneAndUpdate(
                { sessionID: reference }, // Use the correct identifier here
                { $set: { status: 'successful' } }, // Update status to 'successful'
                { new: true }
            );

            if (!updatedSession) {
                console.error(`No session found with reference ${reference}`);
                return res.status(404).send('Session not found');
            }

            console.log(`Payment for reference ${reference} marked as successful`);
            res.status(200).send('Payment status updated successfully');
        } catch (error) {
            console.error(`Failed to update payment status for reference ${reference}:`, error);
            res.status(500).send('Failed to update payment status');
        }
    } else {
        // Handle other events or log them
        console.log(`Received event: ${event}`);
        res.status(200).send('Event logged');
    }
};

module.exports = {
    handlePaystackWebhook,
    updatePaystackStatus,
};