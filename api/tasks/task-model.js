const db = require("../../data/db-config");

const Task = {
  async get_all() {
    return await db("tasks");
  },

  async get_all_by_user_id(user_id) {
    return await db("tasks")
      .where("user_id", user_id);
  },

  async get_by_id(id) {
    return await db("tasks")
      .where({ id })
      .first();
  },

  async upsert(user_id, task_data, task_id = null) {
    if (!user_id) {
      throw new Error('user_id is required');
    }

    if (task_id) {
      const updated = await db('tasks')
        .where({ id: task_id, user_id })
        .update(task_data);
      return updated > 0 ? this.get_by_id(task_id) : null;
    } else {
      const [id] = await db('tasks').insert({
        user_id,
        ...task_data
      });
      return this.get_by_id(id);
    }
  },

  async delete(id) {
    return await db("tasks").where("id", id).del();
  }
};

module.exports = Task;
