const Admin = require('../models/Admin');
const User = require('../models/User');

// Function to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Function to get user activity stats
exports.getUserActivityStats = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Assuming we have a method to get activity stats
        const activityStats = await user.getActivityStats();
        res.status(200).json(activityStats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user activity stats', error });
    }
};

// Function to adjust wallet balance
exports.adjustWalletBalance = async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.wallet.balance += amount; // Adjust balance
        await user.save();
        res.status(200).json({ message: 'Wallet balance updated', balance: user.wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error adjusting wallet balance', error });
    }
};