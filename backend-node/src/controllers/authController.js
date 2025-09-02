const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// User registration
exports.register = async (req, res) => {
    const { email, password, phone } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);       
        const newUser = new User({ email, password: hashedPassword,phone }); //referralCode
        await newUser.save(); 
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        //console.log("JWT_SECRET, JWT_EXPIRES_IN",JWT_SECRET, JWT_EXPIRES_IN,process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// Password reset (to be implemented)
exports.resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // Basic implementation - you can enhance this later
        res.status(200).json({ message: 'Password reset functionality to be implemented' });
    } catch (error) {
        res.status(500).json({ error: 'Password reset failed' });
    }
};

// Social login handling (to be implemented)
exports.socialLogin = async (req, res) => {
    try {
        const { provider, token } = req.body;
        // Basic implementation - you can enhance this later
        res.status(200).json({ message: 'Social login functionality to be implemented' });
    } catch (error) {
        res.status(500).json({ error: 'Social login failed' });
    }
};