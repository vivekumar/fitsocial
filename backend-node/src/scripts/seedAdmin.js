const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

async function seedAdmin() {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const email = 'admin@fitsocial.com';
    const password = 'Admin@123'; // Change this after first login!

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
        console.log('Admin user already exists.');
        process.exit();
    }

    const admin = new Admin({ email, password });
    await admin.save();
    console.log('Admin user created:', email);
    process.exit();
}

seedAdmin();