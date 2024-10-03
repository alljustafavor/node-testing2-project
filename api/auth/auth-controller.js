const jwt = require("jsonwebtoken");
const User = require("../users/users-model");

const auth_controller = {
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      res.status(201).json({ message: "User Registered Successfully", userId: user.id});
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user || !(await User.verify_password(user, password))) {
        return res.status(401).json({ error: "Invaild Credentials" });
      }
      const token = jwt.sign(
        { 
          userId: user.id, 
          role: user.role 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
      );
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = auth_controller;
