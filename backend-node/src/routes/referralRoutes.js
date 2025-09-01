const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const referralMiddleware = require('../middleware/referralMiddleware');

// Route to generate a referral code
router.post('/generate', referralMiddleware.validateReferralCode, referralController.generateReferralCode);

// Route to validate a referral code
router.post('/validate', referralController.validateReferralCode);

// Route to get referral statistics for a user
router.get('/stats/:userId', referralController.getReferralStats);

module.exports = router;