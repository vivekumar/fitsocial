const Wallet = require('../models/Wallet');
const User = require('../models/User');

// Get wallet balance for a user
exports.getBalance = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('wallet');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ balance: user.wallet ? user.wallet.balance : 0 });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wallet balance', error });
    }
};

// Credit FitCoins to a user's wallet
exports.creditFitCoins = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.wallet) {
            user.wallet = { balance: 0 };
        }

        user.wallet.balance += amount;
        await user.save();

        res.status(200).json({ message: 'FitCoins credited successfully', balance: user.wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error crediting FitCoins', error });
    }
};

// Debit FitCoins from a user's wallet
exports.debitFitCoins = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.wallet || user.wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        user.wallet.balance -= amount;
        await user.save();

        res.status(200).json({ message: 'FitCoins debited successfully', balance: user.wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error debiting FitCoins', error });
    }
};

// Get transaction history for a user
exports.getTransactionHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        // This is a placeholder - you can implement actual transaction tracking later
        res.status(200).json({ message: 'Transaction history functionality to be implemented' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction history', error });
    }
};

// Get wallet balance for a user (legacy function)
exports.getWalletBalance = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('wallet');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ balance: user.wallet ? user.wallet.balance : 0 });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wallet balance', error });
    }
};