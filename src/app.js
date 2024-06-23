require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { handleWhatsAppMessage } = require('./handlers/whatsappHandler');
const { errorHandler } = require('./middlewares/errorHandler');
const { logger } = require('./utils/logger');
const { validateEnvironmentVariables } = require('./utils/envValidator');
const config = require('./config/config');

validateEnvironmentVariables();

const app = express();

// Security measures
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');

// Rate limiting
const limiter = rateLimit(config.rateLimit);
app.use('/whatsapp', limiter);

// Routes
app.post('/whatsapp', handleWhatsAppMessage);

// Health check endpoint
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes