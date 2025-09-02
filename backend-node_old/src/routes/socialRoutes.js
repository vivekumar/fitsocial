const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');

// Route to add a friend
router.post('/add-friend', socialController.addFriend);

// Route to remove a friend
router.delete('/remove-friend', socialController.removeFriend);

// Route to get friends list
router.get('/friends', socialController.getFriendsList);

// Route to get leaderboard
router.get('/leaderboard', socialController.getLeaderboard);

// Route to post a status update
router.post('/status', socialController.postStatus);

// Route to get status updates
router.get('/status', socialController.getStatusUpdates);

module.exports = router;