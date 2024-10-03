const Task = require("./task-model");

const tasks_controller = {
  async get_all_tasks(req, res, next) {
    try {
      const user_id = req.query.user_id;
      let tasks;

      if (user_id) {
        tasks = await Task.get_all_by_user_id(user_id);
      } else {
        tasks = await Task.get_all();
      }

      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },

  async get_task_by_id(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Task.get_by_id(id);

      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  async create_or_update(req, res, next) {
    try {
      const task_data = req.body;
      const task_id = req.params.id;
      const task = await Task.upsert(req.user_id, task_data, task_id);

      if (!task) {
        return res.status(404).json({ message: "Task not found or you don't have permission to update it" });
      }

      res.status(task_id ? 200 : 201).json(task);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const before_deletion = await Task.get_by_id(req.params.id);
      const deleted_task = await Task.delete(req.params.id);

      if (deleted_task) {
        res.json({ message: "Task successfully deleted", task_deleted: before_deletion});
      } else {
        res.status(404).json({ message: "Task not found"});
      }
    } catch (error) {
      next(error); 
    }
  }
};

module.exports = tasks_controller;
