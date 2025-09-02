const Step = require('../models/Step');

// Fetch daily step count for a user
exports.getDailySteps = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        const stepsData = await Step.findOne({ user_id: userId, date: today });

        if (!stepsData) {
            return res.status(404).json({ message: 'No step data found for today.' });
        }

        res.status(200).json(stepsData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Store daily step count for a user
exports.storeDailySteps = async (req, res) => {
    try {
        const userId = req.user.id;
        const { steps, distance, calories } = req.body;
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        const existingData = await Step.findOne({ user_id: userId, date: today });

        if (existingData) {
            existingData.steps = steps;
            existingData.distance = distance;
            existingData.calories = calories;
            await existingData.save();
            return res.status(200).json({ message: 'Step data updated successfully.' });
        }

        const newStepData = new Step({
            user_id: userId,
            date: today,
            steps,
            distance,
            calories,
        });

        await newStepData.save();
        res.status(201).json({ message: 'Step data stored successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Calculate calories burned based on steps
exports.calculateCalories = (steps) => {
    const caloriesPerStep = 0.04; // Example value
    return steps * caloriesPerStep;
};

// Fetch step metrics for a specific date
exports.getStepsByDate = async (req, res) => {
    try {
        const userId = req.user.id;
        const { date } = req.params;

        const stepsData = await Step.findOne({ user_id: userId, date });

        if (!stepsData) {
            return res.status(404).json({ message: 'No step data found for the specified date.' });
        }

        res.status(200).json(stepsData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};