const { express, Router } = require('express');
const passport = require('passport');
const User = require('./modules/user') 
const router = Router();

function isLoggedin(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

router.get('/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/failure'
    }));

router.get('/protected', isLoggedin, async (req, res) => {
    console.log("User logged in. ID: ", req.user.id)
    try {
        let user = await User.findOne({ id: req.user.id });
        if (!user) {
            // Create new account
            user = new User({ id: req.user.id, games:[] });
            user = await user.save();
            console.log(`User with id: ${req.user.id} created new account.`)
        } else {
            // Sign in to account
            console.log(`User with id: ${req.user.id} succesfull sign in.`)
        }
    } catch (error) {
        console.log(`User with id: ${req.user.id} have ERROR with auth: ${error}`)
        res.redirect('http://localhost:3000/authError')
    }

    res.redirect('http://localhost:3000')
})

router.get('/cabage', isLoggedin, (req, res) => {
    console.log("User with id:", req.user.id, "gained acces to his account")
    res.json(req.user.id)
})

router.get('/failure', (req, res) =>
    res.send("Something went wrong!"))

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('See you again!')
})

module.exports = router