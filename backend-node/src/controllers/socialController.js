const Social = require('../models/Social');

// Follow a user
exports.followUser = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    try {
        const socialEntry = await Social.findOne({ userId: currentUserId });

        if (!socialEntry) {
            const newSocialEntry = new Social({
                userId: currentUserId,
                following: [userId],
            });
            await newSocialEntry.save();
        } else {
            if (!socialEntry.following.includes(userId)) {
                socialEntry.following.push(userId);
                await socialEntry.save();
            }
        }

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error following user', error });
    }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    try {
        const socialEntry = await Social.findOne({ userId: currentUserId });

        if (socialEntry && socialEntry.following.includes(userId)) {
            socialEntry.following = socialEntry.following.filter(id => id !== userId);
            await socialEntry.save();
            res.status(200).json({ message: 'User unfollowed successfully' });
        } else {
            res.status(404).json({ message: 'User not found in following list' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error unfollowing user', error });
    }
};

// Get followers and following list
exports.getSocialData = async (req, res) => {
    const currentUserId = req.user.id;

    try {
        const socialEntry = await Social.findOne({ userId: currentUserId }).populate('following', 'username');

        if (!socialEntry) {
            return res.status(404).json({ message: 'No social data found' });
        }

        res.status(200).json({
            following: socialEntry.following,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching social data', error });
    }
};

// Leaderboard functionality
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Social.find().sort({ score: -1 }).limit(10).populate('userId', 'username score');
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
};