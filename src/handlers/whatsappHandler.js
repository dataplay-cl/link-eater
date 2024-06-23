const { processURL } = require('../services/urlProcessor');
const { sendWhatsAppMessage } = require('../services/whatsappService');
const { logger } = require('../utils/logger');
const { performance } = require('perf_hooks');
const { extractUrls } = require('../utils/urlUtils');

async function handleWhatsAppMessage(req, res, next) {
    const startTime = performance.now();
    try {
        const { Body: message, From: from } = req.body;
        const urls = extractUrls(message);

        if (urls.length > 0) {
            const summaries = await Promise.all(urls.map(processURL));
            for (let i = 0; i < urls.length; i++) {
                const replyMessage = `${urls[i]}\n\nSummary:\n${summaries[i]}`;
                await sendWhatsAppMessage(from, replyMessage);
            }
        } else {
            await sendWhatsAppMessage(from, "No URLs found in the message. Please share a valid URL to get a summary.");
        }

        res.sendStatus(200);
    } catch (error) {
        logger.error('Error handling WhatsApp message:', { error: error.message });
        next(error);
    } finally {
        const endTime = performance.now();
        logger.info(`Request processed in ${endTime - startTime} milliseconds`);
    }
}

module.exports = { handleWhatsAppMessage };