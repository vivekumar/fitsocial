const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminMiddleware } = require('../middleware/authMiddleware');

// Route to get all users
router.get('/users', adminMiddleware, adminController.getAllUsers);

// Route to get user by ID
router.get('/users/:id', adminMiddleware, adminController.getUserById);

// Route to update user details
router.put('/users/:id', adminMiddleware, adminController.updateUser);

// Route to delete a user
router.delete('/users/:id', adminMiddleware, adminController.deleteUser);

// Route to monitor activity stats
router.get('/activity-stats', adminMiddleware, adminController.getActivityStats);

// Route to adjust wallet balance
router.put('/wallet/:id', adminMiddleware, adminController.adjustWalletBalance);

module.exports = router;