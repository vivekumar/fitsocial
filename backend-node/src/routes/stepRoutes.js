const express = require('express');
const router = express.Router();
const stepController = require('../controllers/stepController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Route to fetch daily step count
router.get('/steps', authMiddleware, stepController.getDailySteps);

// Route to store daily step count
router.post('/steps', authMiddleware, stepController.storeDailySteps);

// Route to fetch step metrics for a specific date
router.get('/steps/:date', authMiddleware, stepController.getStepsByDate);

module.exports = router;