const express = require('express');
const walletController = require('../controllers/walletController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get wallet balance
router.get('/balance', authMiddleware, walletController.getBalance);

// Route to credit FitCoins
router.post('/credit', authMiddleware, walletController.creditFitCoins);

// Route to debit FitCoins
router.post('/debit', authMiddleware, walletController.debitFitCoins);

// Route to get transaction history
router.get('/transactions', authMiddleware, walletController.getTransactionHistory);

module.exports = router;