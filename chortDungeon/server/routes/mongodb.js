const { express, Router } = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User  = require('./modules/user')


//creation of router
const router = Router();

router.get('/user', async(req, res) => {
    try {
        // Parse the user data from the request
        const userData = {
            "id": "user123",
            "games": [
                {
                    "gamePrompt": "Game 1 Prompt",
                    "chatLog": [
                        { "role": "assistant", "message": "Assistant's message 1" },
                        { "role": "player", "message": "Player's message 1" }
                    ]
                },
                {
                    "gamePrompt": "Game 2 Prompt",
                    "chatLog": [
                        { "role": "assistant", "message": "Assistant's message 1" },
                        { "role": "player", "message": "Player's message 1" },
                        { "role": "assistant", "message": "Assistant's message 2" }
                    ]
                }
            ]
        };

        // Create a new user using the User model
        const newUser = new User(userData);
        
        // Save the new user to the database
        const savedUser = await newUser.save();
        
        res.status(201).json(savedUser); // Respond with the saved user data
    } catch (error) {
        res.status(500).json({ error: 'Error creating the user' });
    }
})

//get games prompts by user id
router.get('/games', async (req, res) => {
    try {
        // const userId = req.params.userId;
        const userId = req.user.id;

        // Find the user by their ID
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Extract the game prompts from the user object
        const gamePrompts = user.games.map(game => game.gamePrompt);

        res.status(200).json({ gamePrompts });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching game prompts' });
    }
});

//create New game
// router.get('/create/game', async (req, res) => {
//     try {
//         // const userId = req.params.userId;
//         const userId = req.user.id;
//         const gamePrompt = req.body.gamePrompt;
//         // Find the user by their ID
//         const user = await User.findOne({ id: userId });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Create a new game object with the provided game data
//         // const gameData = req.body; // Assuming you're sending game data in the request body
//         // const newGame = {
//         //     gamePrompt: gameData.gamePrompt,
//         //     chatLog: gameData.chatLog || [], // Initialize chatLog as an empty array or with provided data
//         // };
//         const newGame = {
//             gamePrompt: "testing",
//             chatLog: [{role:"assistant", message:"hello its a test"}] || [], // Initialize chatLog as an empty array or with provided data
//         };

//         // Add the new game object to the user's games array
//         user.games.push(newGame);

//         // Save the updated user to the database
//         const updatedUser = await user.save();

//         res.status(201).json(updatedUser);
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: 'Error creating a new game for the user' });
//     }
// })
router.post('/create/game', async (req, res) => {
    try {
        const userId = String(req.body.userId);
        const gamePrompt = req.body.gamePrompt;
        const chatLog = req.body.chatLog;

        const user = await User.findOne({ id: userId });

        

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if a game with the same gamePrompt already exists for the user
        const existingGame = user.games.find(game => game.gamePrompt === gamePrompt);

        if (existingGame) {
            // If the game exists, update its chatLog
            existingGame.chatLog = chatLog;
        } else {
            // If the game doesn't exist, create a new game
            const newGame = {
                gamePrompt: gamePrompt,
                chatLog: chatLog,
            };

            // Add the new game object to the user's games array
            user.games.push(newGame);
        }

        // Save the updated user to the database
        const updatedUser = await user.save();

        res.status(201).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating or updating the game for the user' });
    }
});



//get game chatLog by user id and gamePrompt
router.get('/chatLog', async (req, res) => {
    try {
        // const userId = req.params.userId;
        const userId = req.query.userId
        // const gamePrompt = req.params.gamePrompt;
        const gamePrompt = req.query.gamePrompt
        console.log('This is the previous chatLog game info: ', userId, gamePrompt)
        // Find the user by their ID
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the game object with the matching game prompt
        const game = user.games.find((game) => game.gamePrompt === gamePrompt);

        if (!game) {
            return res.status(404).json({ message: 'Game prompt not found for this user' });
        }

        // Extract the chat log from the game object
        let chatLog = game.chatLog;

        // const newChatLog = chatLog.map(obj => {
        //     const { _id, ...rest } = obj;
        //     return rest;
        // });

        res.status(200).json({ chatLog });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching chat log' });
    }
});

//update chatLog by userId and gamePrompt
router.put('/updateChatLog', async (req, res) => {
    try {
        // const userId = req.params.userId;
        // const gamePrompt = req.params.gamePrompt;
        const userId = "user123"
        const gamePrompt = "Game 1 Prompt"

        // Find the user by their ID
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the game within the user's games array by gamePrompt
        const game = user.games.find((game) => game.gamePrompt === gamePrompt);

        if (!game) {
            return res.status(404).json({ error: 'Game not found for the given gamePrompt' });
        }

        // Update the chatLog of the found game
        // game.chatLog = req.body.chatLog;
        game.chatLog = [{role:"kabachok", message:"the route is working!"}]
        // Save the updated user to the database
        const updatedUser = await user.save();

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating chatLog' });
    }
});

mongoose.connect(process.env.MONGO_DB_CONNECTION_LINK)
    .then(() => {
        console.log("--- MongoDB connected! ---")
    });

module.exports = router