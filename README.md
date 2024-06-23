# Link Eater

## Overview

Link Eater is an AI-powered bot that provides concise summaries of web content directly through WhatsApp. Users can send a URL to the bot, and it responds with a brief summary of the webpage or YouTube video content. This tool is designed to help users quickly grasp the essence of online content without having to navigate through entire articles or videos.

## Features

- Summarize web articles and blog posts
- Generate concise summaries of YouTube videos
- Process URLs shared in WhatsApp messages
- Utilize AI to create accurate and relevant summaries

## Technology Stack

- Node.js
- Express.js
- Twilio WhatsApp API
- OpenAI GPT-3.5
- YouTube Data API
- Jina AI for web scraping

## Installation

1. Clone the repository:
git clone https://github.com/dataplay-cl/whatsapp-summarizer.git

2. Navigate to the project directory:
cd whatsapp-summarizer

3. Install dependencies:
npm install

4. Set up environment variables:
Create a `.env` file in the root directory and add the following:
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_whatsapp_number
OPENAI_API_KEY=your_openai_api_key
YOUTUBE_API_KEY=your_youtube_api_key
JINA_API_KEY=your_jina_api_key
PORT=3000

5. Start the server:
npm start

## Usage

1. Add the Link Eater number to your contacts.
2. Send a message with a URL to the bot.
3. Receive a concise summary of the content.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Twilio for providing the WhatsApp API
- OpenAI for the GPT-3.5 model
- YouTube for their Data API
- Jina AI for web scraping capabilities

## Contact

For any queries, please open an issue in this repository.
