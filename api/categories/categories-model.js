const db = require("../../data/db-config");

const Category = {
  async get_all() {
    return db("categories"); 
  },

  async get_by_id(id) {
    return db("categories").where({ id }).first();
  },

  async create(category_data) {
    const [id] = await db("categories").insert(category_data);
    return this.get_by_id(id);
  },

  async update(category_id, category_data) {
    await db("categories").where("id", category_id).update(category_data)
    return this.get_by_id(category_id);
  },

  async delete(id) {
    return db("categories")
      .where("id", id)
      .del();
  }
}

module.exports = Category
