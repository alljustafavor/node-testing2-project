// src/users/users-router.js
const express = require('express');
const router = express.Router();
const users_controller = require('./users-controller');
//const auth_middleware = require('../middlewares/auth-middleware');

router.get('/me', users_controller.get_current_user);

router.put('/me', users_controller.update_user);

router.get('/', users_controller.get_all_users);

router.get('/:id', users_controller.get_user_by_id);

router.delete('/:id', users_controller.delete_user);

module.exports = router;
