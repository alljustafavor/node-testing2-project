const User = require("./users-model");
const db = require("../../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})
beforeEach(async () => {
  await db.seed.run();
})
afterAll(async () => {
  await db.destroy();
})

describe('users model', () => {
  describe('get_all resolves all users', () => {
    it("should return an array of users", async () => {
      const users = await User.get_all();
      expect(users).toHaveLength(3);
      expect(users[0]).toMatchObject({
        id: 1,
        username: 'admin_user',
        email: 'admin@example.com',
        role: 'admin'
      });
    });
  });

  describe("get_by_id resolves user", () => {
    it("should return user with given :id", async () => {
      const user = await User.get_by_id(1);
      expect(user).toMatchObject({
        id: 1,
        username: 'admin_user',
        email: 'admin@example.com',
        role: 'admin'
      });
    });
  });

  describe("get_by_email resolves user", () => {
    it("should return user with given email", async () => {
      const user = await User.get_by_email("admin@example.com");
      expect(user).toMatchObject({
        id: 1,
        username: 'admin_user',
        email: 'admin@example.com',
        role: 'admin'
      });
    });
  });

  describe("delete removes user", () => {
    it("should remove user with given id", async () => {
      const user = await User.delete(1);
      expect(user).toBe(1);
    });
  });

  describe("update_role updates role", () => {
    it("should update role with given id, and role", async () => {
      const user = await User.update_role(1, "user");
      expect(user).toMatchObject({
        id: 1,
        username: 'admin_user',
        email: 'admin@example.com',
        role: 'user'
      });
    });
  });
});


