const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    achieved: {
        type: Boolean,
        default: false
    },
    rewardPoints: {
        type: Number,
        default: 0
    },
    dateAchieved: {
        type: Date
    }
}, { timestamps: true });

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;