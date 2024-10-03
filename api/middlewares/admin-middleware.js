const admin_middleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admin rights required." });
  }
  next();
};

module.exports = admin_middleware;
