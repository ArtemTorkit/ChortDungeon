const mongoose = require("mongoose");

// Define a schema for the Game data
const gameSchema = new mongoose.Schema({
    gamePrompt: {
        type: String,
        required: true,
    },
    chatLog: [
        {
            role: {
                type: String,
                enum: ['assistant', 'user'], // Define the possible roles
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
        },
    ],
});

// Define the User schema
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    games: [gameSchema], // An array of game documents
});

// Create a model for the User data
const User = mongoose.model('User', userSchema);

module.exports = User;