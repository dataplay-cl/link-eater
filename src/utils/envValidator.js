function validateEnvironmentVariables() {
    const requiredEnvVars = [
        'PORT', 
        'JINA_API_KEY', 
        'OPENAI_API_KEY', 
        'YOUTUBE_API_KEY',
        'TWILIO_ACCOUNT_SID',
        'TWILIO_AUTH_TOKEN',
        'TWILIO_PHONE_NUMBER'
    ];
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
}

module.exports = { validateEnvironmentVariables };