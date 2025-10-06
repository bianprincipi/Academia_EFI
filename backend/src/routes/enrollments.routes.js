const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/roles');
const ctrl = require('../controllers/enrollments.controller');

// Crear inscripción: estudiante (a sí mismo) o admin
router.post('/', auth, permit('estudiante','admin'), ctrl.create);

// Ver inscripciones de un usuario: estudiante (solo propia) o admin
router.get('/user/:userId', auth, permit('estudiante','admin'), ctrl.byUser);

// Dar de baja una inscripción
router.delete('/:id', auth, permit('estudiante','admin'), ctrl.remove);

module.exports = router;
