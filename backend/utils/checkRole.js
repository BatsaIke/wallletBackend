const checkRole = (roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }
    next();
};

module.exports = checkRole