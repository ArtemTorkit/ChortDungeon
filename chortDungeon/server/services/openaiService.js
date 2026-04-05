const { OpenAI } = require("openai");

class OpenAIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateGPTResponse(messageHistory) {
        const completion = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messageHistory,
        });

        return completion.choices[0].message;
    }

    async generateImage(prompt) {
        const response = await this.openai.images.generate({
            prompt: `Pixelated art, without text. ${prompt}`,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        return response.data[0].b64_json;
    }
}

module.exports = new OpenAIService();
