// filepath: /backend-node/src/controllers/userController.js
const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fetch user-specific data
exports.getUserData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await User.findById(userId).populate('steps rewards'); // Assuming steps and rewards are populated fields
        if (!userData) {
            return res.status(404).json({ message: 'User data not found' });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};