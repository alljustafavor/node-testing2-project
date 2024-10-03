const jwt = require('jsonwebtoken');

const auth_middleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No authentication token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.userId,
      role: decoded.role
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
    next(error)
  }
};

module.exports = auth_middleware;
