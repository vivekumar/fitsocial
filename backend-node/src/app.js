const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const referralRoutes = require('./routes/referralRoutes');
const stepRoutes = require('./routes/stepRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const socialRoutes = require('./routes/socialRoutes');
const walletRoutes = require('./routes/walletRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/steps', stepRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/auth', adminAuthRoutes);

app.use(errorHandler);

module.exports = app;