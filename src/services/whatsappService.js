const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const { logger } = require('../utils/logger');

async function sendWhatsAppMessage(to, message) {
    try {
        await client.messages.create({
            body: message,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            to: `whatsapp:${to}`
        });
        logger.info('WhatsApp message sent successfully', { to });
    } catch (error) {
        logger.error('Error sending WhatsApp message:', { to, error: error.message });
        throw new Error('Failed to send WhatsApp message');
    }
}

module.exports = { sendWhatsAppMessage };