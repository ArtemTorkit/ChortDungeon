const { Router } = require('express');
const gameController = require('../controllers/gameController');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { validateGamePrompt } = require('../middlewares/validationMiddleware');

const router = Router();

// Test user routing removed or isolated.
// Now using auth exclusively. Wait, the old frontend expects '/create/game' and '/chatLog'
// to either pass userId manually OR use req.user.id. 
// Old routing assumed 'req.body.userId' mapped to 'req.user.id' natively inside passport.

router.get('/games', isLoggedIn, gameController.getGames);
router.post('/create/game', gameController.createOrUpdateGame); 
router.get('/chatLog', validateGamePrompt, gameController.getChatLog);
router.put('/updateChatLog', validateGamePrompt, gameController.updateChatLog);

module.exports = router;
