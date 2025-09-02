const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Route to create a new competition
router.post('/', authMiddleware, competitionController.createCompetition);

// Route to join a competition
router.post('/:competitionId/join', authMiddleware, competitionController.joinCompetition);

// Route to get all competitions
router.get('/', competitionController.getAllCompetitions);

// Route to get competition details
router.get('/:competitionId', competitionController.getCompetitionDetails);

// Route to get leaderboard for a competition
router.get('/:competitionId/leaderboard', competitionController.getLeaderboard);

// Route to leave a competition
router.post('/:competitionId/leave', authMiddleware, competitionController.leaveCompetition);

module.exports = router;