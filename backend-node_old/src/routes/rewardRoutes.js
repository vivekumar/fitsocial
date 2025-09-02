const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

// Route to get all rewards
router.get('/', rewardController.getAllRewards);

// Route to create a new reward
router.post('/', rewardController.createReward);

// Route to get a specific reward by ID
router.get('/:id', rewardController.getRewardById);

// Route to update a reward by ID
router.put('/:id', rewardController.updateRewardById);

// Route to delete a reward by ID
router.delete('/:id', rewardController.deleteRewardById);

module.exports = router;