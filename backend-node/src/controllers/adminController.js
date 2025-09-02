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

// Function to get user by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Function to update user details
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Function to delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Function to get activity stats
exports.getActivityStats = async (req, res) => {
    try {
        // This is a placeholder - you can implement actual activity stats later
        const stats = {
            totalUsers: await User.countDocuments(),
            activeUsers: await User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
            totalSteps: 0, // Placeholder
            totalRewards: 0 // Placeholder
        };
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activity stats', error });
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
    try {
        const { id } = req.params;
        const { amount } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.wallet) {
            user.wallet = { balance: 0 };
        }
        user.wallet.balance += amount; // Adjust balance
        await user.save();
        res.status(200).json({ message: 'Wallet balance updated', balance: user.wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error adjusting wallet balance', error });
    }
};