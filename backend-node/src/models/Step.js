const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    steps: {
        type: Number,
        required: true,
        default: 0
    },
    distance: {
        type: Number,
        required: true,
        default: 0 // in kilometers
    },
    calories: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Step', stepSchema);