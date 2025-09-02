const Reward = require('../models/Reward');

// Get all rewards
exports.getAllRewards = async (req, res) => {
    try {
        const rewards = await Reward.find();
        res.status(200).json(rewards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rewards', error: error.message });
    }
};

// Create a new reward
exports.createReward = async (req, res) => {
    try {
        const { userId, target, rewardAmount } = req.body;
        const newReward = new Reward({ userId, target, rewardAmount });
        await newReward.save();
        res.status(201).json({ message: 'Reward created successfully', reward: newReward });
    } catch (error) {
        res.status(500).json({ message: 'Error creating reward', error: error.message });
    }
};

// Get a specific reward by ID
exports.getRewardById = async (req, res) => {
    try {
        const { id } = req.params;
        const reward = await Reward.findById(id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json(reward);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reward', error: error.message });
    }
};

// Update a reward by ID
exports.updateRewardById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReward = await Reward.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedReward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json({ message: 'Reward updated successfully', reward: updatedReward });
    } catch (error) {
        res.status(500).json({ message: 'Error updating reward', error: error.message });
    }
};

// Delete a reward by ID
exports.deleteRewardById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReward = await Reward.findByIdAndDelete(id);
        if (!deletedReward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json({ message: 'Reward deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reward', error: error.message });
    }
};

// Get all rewards for a user
exports.getUserRewards = async (req, res) => {
    try {
        const { userId } = req.params;
        const rewards = await Reward.find({ userId });
        res.status(200).json(rewards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rewards', error: error.message });
    }
};

// Update a reward
exports.updateReward = async (req, res) => {
    try {
        const { rewardId } = req.params;
        const updatedReward = await Reward.findByIdAndUpdate(rewardId, req.body, { new: true });
        if (!updatedReward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json({ message: 'Reward updated successfully', reward: updatedReward });
    } catch (error) {
        res.status(500).json({ message: 'Error updating reward', error: error.message });
    }
};

// Delete a reward
exports.deleteReward = async (req, res) => {
    try {
        const { rewardId } = req.params;
        const deletedReward = await Reward.findByIdAndDelete(rewardId);
        if (!deletedReward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json({ message: 'Reward deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reward', error: error.message });
    }
};