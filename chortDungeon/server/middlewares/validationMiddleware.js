function validateGamePrompt(req, res, next) {
    if (!req.body.gamePrompt && !req.query.gamePrompt) {
        return res.status(400).json({ error: 'gamePrompt is required' });
    }
    next();
}

function validateOpenAIPrompt(req, res, next) {
    if (!req.body.prompt) {
        return res.status(400).json({ error: 'prompt is required' });
    }
    next();
}

module.exports = {
    validateGamePrompt,
    validateOpenAIPrompt
};
