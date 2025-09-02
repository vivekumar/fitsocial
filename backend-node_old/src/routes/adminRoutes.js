const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');

// Route to get all users
router.get('/users', adminMiddleware.authorizeAdmin, adminController.getAllUsers);

// Route to get user by ID
router.get('/users/:id', adminMiddleware.authorizeAdmin, adminController.getUserById);

// Route to update user details
router.put('/users/:id', adminMiddleware.authorizeAdmin, adminController.updateUser);

// Route to delete a user
router.delete('/users/:id', adminMiddleware.authorizeAdmin, adminController.deleteUser);

// Route to monitor activity stats
router.get('/activity-stats', adminMiddleware.authorizeAdmin, adminController.getActivityStats);

// Route to adjust wallet balance
router.put('/wallet/:id', adminMiddleware.authorizeAdmin, adminController.adjustWalletBalance);

module.exports = router;