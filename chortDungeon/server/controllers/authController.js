const userRepository = require('../repositories/userRepository');

class AuthController {
    async handleGoogleCallback(req, res) {
        console.log("User logged in. ID: ", req.user.id);
        try {
            let user = await userRepository.findById(req.user.id);
            if (!user) {
                await userRepository.createUser(req.user.id, []);
                console.log(`User with id: ${req.user.id} created new account.`);
            } else {
                console.log(`User with id: ${req.user.id} successful sign in.`);
            }
            res.redirect('http://localhost:3000');
        } catch (error) {
            console.log(`User with id: ${req.user.id} have ERROR with auth: ${error}`);
            res.redirect('http://localhost:3000/authError');
        }
    }

    getCabage(req, res) {
        console.log("User with id:", req.user.id, "gained access to his account");
        res.json(req.user.id);
    }

    handleFailure(req, res) {
        res.send("Something went wrong!");
    }

    logout(req, res) {
        req.session.destroy();
        res.send('See you again!');
    }
}

module.exports = new AuthController();
