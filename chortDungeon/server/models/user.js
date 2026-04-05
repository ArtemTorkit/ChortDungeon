const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gamePrompt: {
        type: String,
        required: true,
    },
    chatLog: [
        {
            role: {
                type: String,
                enum: ['assistant', 'user', 'player', 'kabachok'], // Allowed roles (kabachok added from test route)
                required: true,
            },
            content: {
                type: String,
                // Make it required false, because sometimes they pass 'message' in older dummy routes
                required: false, 
            },
            message: {
                type: String,
                required: false,
            }
        },
    ],
});

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    games: [gameSchema], 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
