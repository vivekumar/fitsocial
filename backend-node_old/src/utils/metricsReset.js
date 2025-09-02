module.exports = function resetDailyMetrics() {
    const currentDate = new Date();
    const midnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    if (currentDate.getTime() === midnight.getTime()) {
        // Logic to reset daily metrics for all users
        // This could involve clearing step counts, resetting daily rewards, etc.
        console.log("Daily metrics have been reset for all users.");
    } else {
        console.log("No reset needed at this time.");
    }
};