const express = require("express");
const router = express.Router();
const tasks_controller = require("./tasks-controller");
const auth_middleware = require("../middlewares/auth-middleware");

router.get("/", tasks_controller.get_all_tasks);
router.get("/:id", tasks_controller.get_task_by_id);
router.post("/", auth_middleware, tasks_controller.create_or_update);
router.patch("/:id", auth_middleware, tasks_controller.create_or_update);
router.delete("/:id", auth_middleware, tasks_controller.delete);

module.exports = router;
