const Notification = require('../models/Notification');
const notificationSender = require('../utils/notificationSender');

// Send a notification to a user
exports.sendNotification = async (req, res) => {
    const { userId, message } = req.body;

    try {
        const notification = await Notification.create({ userId, message });
        await notificationSender.send(userId, message);
        res.status(201).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send notification', error });
    }
};

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve notifications', error });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    const { notificationId } = req.params;

    try {
        await Notification.findByIdAndDelete(notificationId);
        res.status(204).json({ success: true, message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete notification', error });
    }
};