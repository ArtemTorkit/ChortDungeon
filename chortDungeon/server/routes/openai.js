const {express, Router} = require('express')
const { Configuration, OpenAI } = require("openai");
const dotenv = require('dotenv')

//creation of router
const router = Router();

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/gpt', async (req, res) => {
    const messageHistory = req.body.prompt;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messageHistory,
            // max_tokens: 70,
        });

        console.log(completion.choices[0].message);
        res.json(completion.choices[0].message)
    } catch (error) {
        console.error("Error:", error);
    }
})
router.post('/image', async (req, res) => {
    const { prompt } = req.body;
    console.log('the image prompt is:', prompt)
    try {
        const response = await openai.images.generate({
            prompt: `Pixelated art, without text. ${prompt}`,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        const image = response.data[0].b64_json
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = router