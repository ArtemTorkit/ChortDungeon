const gameService = require('../services/gameService');

class GameController {
    async getGames(req, res) {
        try {
            const userId = req.user.id;
            const gamePrompts = await gameService.getUserGames(userId);
            res.status(200).json({ gamePrompts });
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(500).json({ error: 'Error fetching game prompts' });
        }
    }

    async createOrUpdateGame(req, res) {
        try {
            const userId = String(req.body.userId);
            const { gamePrompt, chatLog } = req.body;

            const updatedUser = await gameService.createOrUpdateGame(userId, gamePrompt, chatLog);
            res.status(201).json(updatedUser);
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ error: 'User not found' });
            }
            console.error(error);
            res.status(500).json({ error: 'Error creating or updating the game for the user' });
        }
    }

    async getChatLog(req, res) {
        try {
            const { userId, gamePrompt } = req.query;
            console.log('Fetching chatLog for: ', userId, gamePrompt);

            const chatLog = await gameService.getChatLog(userId, gamePrompt);
            res.status(200).json({ chatLog });
        } catch (error) {
            if (error.message === 'User not found' || error.message === 'Game prompt not found for this user') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ error: 'Error fetching chat log' });
        }
    }

    async updateChatLog(req, res) {
        try {
            // Note: the original route hardcoded user123 and 'Game 1 Prompt',
            // Here we fix it to dynamically read fields
            const { userId, gamePrompt, chatLog } = req.body;
            
            const updatedUser = await gameService.updateChatLog(userId, gamePrompt, chatLog);
            res.json(updatedUser);
        } catch (error) {
            if (error.message === 'User not found' || error.message === 'Game not found for the given gamePrompt') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: 'Error updating chatLog' });
        }
    }
}

module.exports = new GameController();
