const User = require("./users-model");

const users_controller = {
  async get_current_user(req, res, next) {
    try {
      const user = await User.get_by_id(req.user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...user_without_password } = user; // eslint-disable-line
      res.json(user_without_password);
    } catch (error) {
      next(error);
    }
  },

  async update_user(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedUser = await User.update(id, updates);

      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  async get_all_users(req, res, next) {
    try {
      const users = await User.get_all();

      if (!Array.isArray(users)) {
        throw new Error('Expected an array of users');
      }

      const users_without_passwords = users.map(user => {
        const { password, ...user_without_password } = user; // eslint-disable-line
        return user_without_password;
      });

      res.json(users_without_passwords);
    } catch (error) {
      next(error);
    }
  },

  async get_user_by_id(req, res, next) {
    try {
      const user = await User.get_by_id(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...user_without_password } = user; // eslint-disable-line
      res.json(user_without_password);
    } catch (error) {
      next(error);
    } 
  },

  async delete_user(req, res, next) {
    try {
      const deleted_user = await User.delete(req.params.id);
      if (deleted_user) {
        res.json({ message: "User successfully deleted" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error); 
    }
  }
};

module.exports = users_controller;
