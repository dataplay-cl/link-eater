const { handleNormalURL } = require('./normalUrlHandler');
const { handleYouTubeURL } = require('./youTubeHandler');
const { logger } = require('../utils/logger');
const NodeCache = require('node-cache');
const config = require('../config/config');

const cache = new NodeCache({ stdTTL: config.cache.ttl });

async function processURL(url) {
    logger.info('Processing URL', { url });

    const cachedSummary = cache.get(url);
    if (cachedSummary) {
        logger.info('Returning cached summary', { url });
        return cachedSummary;
    }

    let summary;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        summary = await handleYouTubeURL(url);
    } else {
        summary = await handleNormalURL(url);
    }

    cache.set(url, summary);
    return summary;
}

module.exports = { processURL };