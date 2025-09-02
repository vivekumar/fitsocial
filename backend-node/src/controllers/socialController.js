const Social = require('../models/Social');

// Add a friend
exports.addFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const currentUserId = req.user.id;

        const socialEntry = await Social.findOne({ userId: currentUserId });

        if (!socialEntry) {
            const newSocialEntry = new Social({
                userId: currentUserId,
                friends: [friendId],
            });
            await newSocialEntry.save();
        } else {
            if (!socialEntry.friends.includes(friendId)) {
                socialEntry.friends.push(friendId);
                await socialEntry.save();
            }
        }

        res.status(200).json({ message: 'Friend added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding friend', error });
    }
};

// Remove a friend
exports.removeFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const currentUserId = req.user.id;

        const socialEntry = await Social.findOne({ userId: currentUserId });

        if (socialEntry && socialEntry.friends.includes(friendId)) {
            socialEntry.friends = socialEntry.friends.filter(id => id !== friendId);
            await socialEntry.save();
            res.status(200).json({ message: 'Friend removed successfully' });
        } else {
            res.status(404).json({ message: 'Friend not found in friends list' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing friend', error });
    }
};

// Get friends list
exports.getFriendsList = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const socialEntry = await Social.findOne({ userId: currentUserId }).populate('friends', 'username');

        if (!socialEntry) {
            return res.status(404).json({ message: 'No friends found' });
        }

        res.status(200).json({
            friends: socialEntry.friends || [],
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching friends list', error });
    }
};

// Post a status update
exports.postStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const currentUserId = req.user.id;

        const socialEntry = await Social.findOne({ userId: currentUserId });

        if (!socialEntry) {
            const newSocialEntry = new Social({
                userId: currentUserId,
                status: [status],
            });
            await newSocialEntry.save();
        } else {
            if (!socialEntry.status) {
                socialEntry.status = [];
            }
            socialEntry.status.push(status);
            await socialEntry.save();
        }

        res.status(200).json({ message: 'Status posted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error posting status', error });
    }
};

// Get status updates
exports.getStatusUpdates = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const socialEntry = await Social.findOne({ userId: currentUserId });

        if (!socialEntry) {
            return res.status(404).json({ message: 'No status updates found' });
        }

        res.status(200).json({
            status: socialEntry.status || [],
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching status updates', error });
    }
};

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