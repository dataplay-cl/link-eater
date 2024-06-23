const fetch = require('node-fetch');
const { summarizeText } = require('./summarizationService');
const { logger } = require('../utils/logger');
const { performance } = require('perf_hooks');
const { extractVideoId } = require('../utils/urlUtils');

async function handleYouTubeURL(url) {
    const startTime = performance.now();
    try {
        const videoId = extractVideoId(url);
        if (!videoId) {
            throw new Error('Invalid YouTube URL');
        }

        const apiKey = process.env.YOUTUBE_API_KEY;
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`YouTube API error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.items || data.items.length === 0) {
            throw new Error('Video not found');
        }

        const { title, description } = data.items[0].snippet;
        const contentToSummarize = `Title: ${title}\n\nDescription: ${description}`;
        
        const summary = await summarizeText(contentToSummarize);
        return summary;
    } catch (error) {
        logger.error('Error handling YouTube URL:', { url, error: error.message });
        throw new Error('An error occurred while processing the YouTube video. Please try again later.');
    } finally {
        const endTime = performance.now();
        logger.info(`YouTube URL processed in ${endTime - startTime} milliseconds`, { url });
    }
}

module.exports = { handleYouTubeURL };