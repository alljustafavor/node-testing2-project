const express = require("express");
const router = express.Router();
const tasks_controller = require("./tasks-controller");
const auth_middleware = require("../middlewares/auth-middleware");
const admin_middleware = require("../middlewares/admin-middleware");

router.get("/", auth_middleware, admin_middleware, tasks_controller.get_all_tasks);
router.post("/", auth_middleware, tasks_controller.create_or_update);

router.get("/:id", auth_middleware, tasks_controller.get_task_by_id);
router.patch("/:id", auth_middleware, tasks_controller.create_or_update);
router.delete("/:id", auth_middleware, tasks_controller.delete);

module.exports = router;
