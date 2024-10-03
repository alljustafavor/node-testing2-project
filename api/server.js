const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const auth_router = require("./auth/auth-router");
const users_router = require("./users/users-router");
const tasks_router = require("./tasks/tasks-router");
const categories_router = require("./categories/categories-router");

const error_handler = require("./middlewares/error-handler");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", auth_router);
server.use("/api/users", users_router);
server.use("/api/tasks", tasks_router);
server.use("/api/categories", categories_router);

server.use(error_handler);

module.exports = server;
