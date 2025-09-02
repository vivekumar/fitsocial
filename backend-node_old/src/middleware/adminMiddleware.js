const adminMiddleware = (req, res, next) => {
    // Check if the user is authenticated and has admin privileges
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' }); // Forbidden access
    }
};

module.exports = adminMiddleware;