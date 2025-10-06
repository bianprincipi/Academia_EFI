const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/roles');
const ctrl = require('../controllers/classes.controller');

// listar: todos los roles autenticados
router.get('/', auth, permit('admin','profesor','estudiante'), ctrl.list);

// crear/editar/eliminar: admin (profe podría editar propias, pero mantenemos simple)
router.post('/', auth, permit('admin'), ctrl.create);
router.put('/:id', auth, permit('admin','profesor'), ctrl.update);
router.delete('/:id', auth, permit('admin'), ctrl.remove);

module.exports = router;
