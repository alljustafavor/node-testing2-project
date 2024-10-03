const express = require('express');
const router = express.Router();
const users_controller = require('./users-controller');
const auth_middleware = require('../middlewares/auth-middleware');
const admin_middleware = require('../middlewares/admin-middleware');

router.get('/me', auth_middleware, users_controller.get_current_user);
router.put('/me', auth_middleware, users_controller.update_user);

router.get('/', auth_middleware, users_controller.get_all_users);

router.get('/:id', auth_middleware, users_controller.get_user_by_id);
router.delete('/:id', auth_middleware, users_controller.delete_user);
router.patch('/:id', auth_middleware, users_controller.update_user);

module.exports = router;
