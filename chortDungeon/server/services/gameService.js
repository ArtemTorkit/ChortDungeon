const userRepository = require('../repositories/userRepository');

class GameService {
    async getUserGames(userId) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user.games.map(game => game.gamePrompt);
    }

    async createOrUpdateGame(userId, gamePrompt, chatLog) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingGame = user.games.find(game => game.gamePrompt === gamePrompt);
        if (existingGame) {
            existingGame.chatLog = chatLog;
        } else {
            user.games.push({ gamePrompt, chatLog });
        }

        return await userRepository.save(user);
    }

    async getChatLog(userId, gamePrompt) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const game = user.games.find(game => game.gamePrompt === gamePrompt);
        if (!game) {
            throw new Error('Game prompt not found for this user');
        }

        return game.chatLog;
    }

    async updateChatLog(userId, gamePrompt, chatLog) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const game = user.games.find(game => game.gamePrompt === gamePrompt);
        if (!game) {
            throw new Error('Game not found for the given gamePrompt');
        }

        game.chatLog = chatLog;
        return await userRepository.save(user);
    }
}

module.exports = new GameService();
