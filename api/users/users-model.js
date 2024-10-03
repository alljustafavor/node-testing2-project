const db = require("../../data/db-config");
const bcrypt = require("bcrypt");

const User = {
  async get_all() {
    return await db("users"); 
  },

  async create(user_data) {
    const { username, email, password } = user_data;
    const hashed_password = bcrypt.hashSync(password, 10);
    const [id] = await db("users").insert({
      username,
      email,
      password: hashed_password
    });
    return this.get_by_id(id);
  },

  async update(id, user_data) {
    if (user_data.password) {
      user_data.password = bcrypt.hashSync(user_data.password, 10);
    }

    await db('users').where({ id }).update(user_data);
    return this.get_by_id(id);
  },

  async get_by_id(id) {
    return db("users")
      .where({ id })
      .first();
  },

  async get_by_email(email) {
    return db("users")
      .where({ email })
      .first();
  },

  async verify_password(user, password) {
    return bcrypt.compareSync(password, user.password);
  },

  async delete(id) {
    return db("users")
      .where("id", id)
      .del();
  },

  async update_role(id, role) {
    await db('users').where({ id }).update({ role });
    return this.get_by_id(id);
  }
};

module.exports = User;
