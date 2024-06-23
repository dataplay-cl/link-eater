const { logger } = require('../utils/logger');

function errorHandler(err, req, res, next) {
    logger.error('Unhandled error:', { error: err.message, stack: err.stack });
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
}

module.exports = { errorHandler };