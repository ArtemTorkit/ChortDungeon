const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

const router = Router();

router.get('/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
);

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/failure'
    })
);

router.get('/protected', isLoggedIn, authController.handleGoogleCallback);
router.get('/cabage', isLoggedIn, authController.getCabage);
router.get('/failure', authController.handleFailure);
router.get('/logout', authController.logout);

module.exports = router;
