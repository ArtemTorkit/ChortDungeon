const openaiService = require('../services/openaiService');

class OpenAIController {
    async generateGPT(req, res) {
        try {
            const messageHistory = req.body.prompt;
            const message = await openaiService.generateGPTResponse(messageHistory);
            
            console.log(message);
            res.json(message);
        } catch (error) {
            console.error("Error generating GPT response:", error);
            res.status(500).json({ error: 'Error generating GPT response' });
        }
    }

    async generateImage(req, res) {
        try {
            const { prompt } = req.body;
            console.log('the image prompt is:', prompt);

            const photo = await openaiService.generateImage(prompt);
            res.status(200).json({ photo });
        } catch (error) {
            console.error("Error generating Image:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

module.exports = new OpenAIController();
