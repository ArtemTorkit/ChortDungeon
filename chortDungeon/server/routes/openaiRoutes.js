const { Router } = require('express');
const openaiController = require('../controllers/openaiController');
const { validateOpenAIPrompt } = require('../middlewares/validationMiddleware');

const router = Router();

router.post('/gpt', validateOpenAIPrompt, openaiController.generateGPT);
router.post('/image', validateOpenAIPrompt, openaiController.generateImage);

module.exports = router;
