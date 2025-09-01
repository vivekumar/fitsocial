const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Route to get all notifications for a user
router.get('/:userId', notificationController.getNotifications);

// Route to create a new notification
router.post('/', notificationController.createNotification);

// Route to mark a notification as read
router.patch('/:notificationId/read', notificationController.markAsRead);

// Route to delete a notification
router.delete('/:notificationId', notificationController.deleteNotification);

module.exports = router;