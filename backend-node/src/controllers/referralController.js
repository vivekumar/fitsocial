const Referral = require('../models/Referral');
const User = require('../models/User');

// Generate a unique referral code for a user
exports.generateReferralCode = async (req, res) => {
    try {
        const userId = req.user.id;
        const referralCode = `REF${userId}`; // Simple example, consider using a more complex generator

        const referral = new Referral({
            user: userId,
            code: referralCode,
        });

        await referral.save();
        res.status(201).json({ success: true, referralCode });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error generating referral code' });
    }
};

// Validate a referral code during user registration
exports.validateReferralCode = async (req, res) => {
    const { referralCode } = req.body;

    try {
        const referral = await Referral.findOne({ code: referralCode });
        if (!referral) {
            return res.status(400).json({ success: false, message: 'Invalid referral code' });
        }

        res.status(200).json({ success: true, message: 'Valid referral code' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error validating referral code' });
    }
};

// Get referral statistics for a user
exports.getReferralStats = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const referralStats = await Referral.find({ user: userId }).populate('referred', 'email');
        const totalReferrals = referralStats.length;
        
        res.status(200).json({
            success: true,
            totalReferrals,
            referrals: referralStats
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching referral stats' });
    }
};

// Track referral relationships
exports.trackReferral = async (referrerId, refereeId) => {
    try {
        const referral = new Referral({
            user: referrerId,
            referred: refereeId,
        });

        await referral.save();
    } catch (error) {
        console.error('Error tracking referral:', error);
    }
};