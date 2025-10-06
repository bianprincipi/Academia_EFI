const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/roles');
const ctrl = require('../controllers/subjects.controller');

// listar: cualquier rol autenticado
router.get('/', auth, permit('admin','profesor','estudiante'), ctrl.list);

// crear/editar/eliminar: solo admin
router.post('/', auth, permit('admin'), ctrl.create);
router.put('/:id', auth, permit('admin'), ctrl.update);
router.delete('/:id', auth, permit('admin'), ctrl.remove);

module.exports = router;
