const { Configuration, OpenAIApi } = require('openai');
const { logger } = require('../utils/logger');
const config = require('../config/config');

const openaiConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

async function summarizeText(text) {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `Please summarize the following text briefly: ${text}` }],
            max_tokens: config.summarization.maxTokens,
        });
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        logger.error('Error summarizing text:', { error: error.message });
        throw new Error('An error occurred while generating the summary. Please try again later.');
    }
}

module.exports = { summarizeText };