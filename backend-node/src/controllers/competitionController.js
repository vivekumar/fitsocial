const Competition = require('../models/Competition');

exports.createCompetition = async (req, res) => {
    try {
        const { name, startDate, endDate, participants } = req.body;
        const competition = new Competition({ name, startDate, endDate, participants });
        await competition.save();
        res.status(201).json({ message: 'Competition created successfully', competition });
    } catch (error) {
        res.status(500).json({ message: 'Error creating competition', error });
    }
};

exports.joinCompetition = async (req, res) => {
    try {
        const { competitionId } = req.params;
        const userId = req.user.id; // Assuming user ID is available in req.user
        const competition = await Competition.findById(competitionId);

        if (!competition) {
            return res.status(404).json({ message: 'Competition not found' });
        }

        if (competition.participants.includes(userId)) {
            return res.status(400).json({ message: 'User already joined the competition' });
        }

        competition.participants.push(userId);
        await competition.save();
        res.status(200).json({ message: 'Successfully joined the competition', competition });
    } catch (error) {
        res.status(500).json({ message: 'Error joining competition', error });
    }
};

// Get all competitions
exports.getAllCompetitions = async (req, res) => {
    try {
        const competitions = await Competition.find().populate('participants', 'name');
        res.status(200).json(competitions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching competitions', error });
    }
};

// Get competition details
exports.getCompetitionDetails = async (req, res) => {
    try {
        const { competitionId } = req.params;
        const competition = await Competition.findById(competitionId).populate('participants', 'name steps');
        
        if (!competition) {
            return res.status(404).json({ message: 'Competition not found' });
        }
        
        res.status(200).json(competition);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching competition details', error });
    }
};

// Leave a competition
exports.leaveCompetition = async (req, res) => {
    try {
        const { competitionId } = req.params;
        const userId = req.user.id;
        const competition = await Competition.findById(competitionId);

        if (!competition) {
            return res.status(404).json({ message: 'Competition not found' });
        }

        if (!competition.participants.includes(userId)) {
            return res.status(400).json({ message: 'User is not part of this competition' });
        }

        competition.participants = competition.participants.filter(id => id.toString() !== userId);
        await competition.save();
        res.status(200).json({ message: 'Successfully left the competition' });
    } catch (error) {
        res.status(500).json({ message: 'Error leaving competition', error });
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const { competitionId } = req.params;
        const competition = await Competition.findById(competitionId).populate('participants', 'name steps');

        if (!competition) {
            return res.status(404).json({ message: 'Competition not found' });
        }

        const leaderboard = competition.participants.sort((a, b) => b.steps - a.steps);
        res.status(200).json({ leaderboard });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
};