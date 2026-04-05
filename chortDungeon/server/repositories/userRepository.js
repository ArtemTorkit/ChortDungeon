const User = require('../models/user');

class UserRepository {
    async findById(userId) {
        return await User.findOne({ id: userId });
    }

    async save(userDocument) {
        return await userDocument.save();
    }

    async createUser(userId, initialGames = []) {
        const newUser = new User({ id: userId, games: initialGames });
        return await newUser.save();
    }
}

module.exports = new UserRepository();
