module.exports = {
    rateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Too many requests from this IP, please try again later.'
    },
    summarization: {
        maxTokens: 60
    },
    cache: {
        ttl: 3600 // 1 hour
    }
};