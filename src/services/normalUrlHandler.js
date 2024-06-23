const fetch = require('node-fetch');
const { summarizeText } = require('./summarizationService');
const { logger } = require('../utils/logger');
const { performance } = require('perf_hooks');

async function handleNormalURL(url) {
    const startTime = performance.now();
    try {
        const response = await fetch(`https://r.jina.ai/${encodeURIComponent(url)}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${process.env.JINA_API_KEY}`,
                "Accept": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const articleText = data.text || '';

        const summary = await summarizeText(articleText);
        return summary;
    } catch (error) {
        logger.error('Error handling normal URL:', { url, error: error.message });
        throw new Error('An error occurred while processing the URL. Please try again later.');
    } finally {
        const endTime = performance.now();
        logger.info(`URL processed in ${endTime - startTime} milliseconds`, { url });
    }
}

module.exports = { handleNormalURL };