const express = require('express');
const walletController = require('../controllers/walletController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get wallet balance
router.get('/balance', authMiddleware.authenticate, walletController.getBalance);

// Route to credit FitCoins
router.post('/credit', authMiddleware.authenticate, walletController.creditFitCoins);

// Route to debit FitCoins
router.post('/debit', authMiddleware.authenticate, walletController.debitFitCoins);

// Route to get transaction history
router.get('/transactions', authMiddleware.authenticate, walletController.getTransactionHistory);

module.exports = router;