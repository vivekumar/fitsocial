const Referral = require('../models/Referral');

const validateReferralCode = async (req, res, next) => {
    const { referralCode } = req.body;

    if (!referralCode) {
        return res.status(400).json({ message: 'Referral code is required.' });
    }

    try {
        const referral = await Referral.findOne({ code: referralCode });

        if (!referral) {
            return res.status(404).json({ message: 'Invalid referral code.' });
        }

        req.referral = referral; // Attach the referral to the request object
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Server error while validating referral code.', error });
    }
};

module.exports = {
    validateReferralCode,
};