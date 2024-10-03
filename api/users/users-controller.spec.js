const User = require("./users-model");
const db = require("../../data/db-config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const request = require("supertest");
const server = require("../server");

let admin_token, user_token;
process.env.JWT_SECRET = 'test_secret';

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();

  const admin_user = await User.create({
    username: "admin",
    email: "admin@test.com",
    password: bcrypt.hashSync("1234", 10),
    role: "admin"
  });

  const regular_user = await User.create({
    username: "test",
    email: "user@test.com",
    password: bcrypt.hashSync("1234", 10),
    role: "user"
  });

  admin_token = jwt.sign({
    userId: admin_user.id,
    role: admin_user.role
  }, process.env.JWT_SECRET, { expiresIn: "1h" });

  user_token = jwt.sign({
    userId: regular_user.id,
    role: regular_user.role
  }, process.env.JWT_SECRET, { expiresIn: "1h" });
})
beforeEach(async () => {
  await db.seed.run();
})
afterAll(async () => {
  await db.destroy();
})

describe('users-controler endpoints', () => {
  describe('get_all_users resolves all users', () => {
    it("[GET] /api/users/", async () => {
      const res = await request(server)
        .get("/api/users/")
        .set('Authorization', `Bearer ${admin_token}`);
      expect(res.body).toHaveLength(3);
    }) 
  }) 

  describe('get_user_by_id resolves user', () => {
    it("[GET] /api/users/:id", async () => {
      const res = await request(server)
        .get("/api/users/1")
        .set('Authorization', `Bearer ${admin_token}`);
      expect(res.body).toMatchObject({
        id: 1,
        username: "admin_user",
        email: "admin@example.com",
        role: "admin"
      });
    }) 
  }) 

  describe('update_user updates user with given :id', () => {
    it("[PUT] /api/users/:id", async () => {
      const res = await request(server)
        .patch("/api/users/1")
        .set('Authorization', `Bearer ${admin_token}`)
        .send({
          username: "admin_updated",
          email: "admin_updated@example.com",
        });
      expect(res.body).toMatchObject({
        username: "admin_updated",
        email: "admin_updated@example.com",
      });
    }) 
  }) 

  describe('delete removes user', () => {
    it("[DEL] /api/users/:id", async () => {
      const res = await request(server)
        .delete("/api/users/1")
        .set('Authorization', `Bearer ${admin_token}`);
      expect(res.body).toMatchObject({
        message: "User successfully deleted"
      });
    }) 
  })
})


