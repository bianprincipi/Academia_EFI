const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/roles');
const ctrl = require('../controllers/users.controller');

// orden: path, middlewares (funciones), handler (función)
router.get('/', auth, permit('admin'), ctrl.list);
router.get('/me', auth, ctrl.me);
router.post('/', auth, permit('admin'), ctrl.create);
router.put('/:id', auth, permit('admin'), ctrl.update);
router.delete('/:id', auth, permit('admin'), ctrl.remove);

module.exports = router;
