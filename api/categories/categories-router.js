const express = require('express');
const router = express.Router();
const category_controller = require('./categories-controller');
const auth_middleware = require('../middlewares/auth-middleware');
const admin_middleware = require('../middlewares/admin-middleware');

router.get('/', auth_middleware, category_controller.get_all);

router.post('/', auth_middleware, admin_middleware, category_controller.create);
router.put('/:id', auth_middleware, admin_middleware, category_controller.update);
router.delete('/:id', auth_middleware, admin_middleware, category_controller.delete);

module.exports = router;
