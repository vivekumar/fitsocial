const Wallet = require('../models/Wallet');
const User = require('../models/User');

// Credit FitCoins to a user's wallet
exports.creditFitCoins = async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.wallet.balance += amount;
        await user.wallet.save();

        res.status(200).json({ message: 'FitCoins credited successfully', balance: user.wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error crediting FitCoins', error });
    }
};

// Debit FitCoins from a user's wallet
exports.debitFitCoins = async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        user.wallet.balance -= amount;
        await user.wallet.save();

        res.status(200).json({ message: 'FitCoins debited successfully', balance: user.wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error debiting FitCoins', error });
    }
};

// Get wallet balance for a user
exports.getWalletBalance = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('wallet');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ balance: user.wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wallet balance', error });
    }
};