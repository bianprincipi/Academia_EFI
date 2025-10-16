'use strict';
const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { permit } = require('../middlewares/roles');
const ctrl = require('../controllers/users.controller');

// RUTAS PÚBLICAS

// GET /users/me - Obtener perfil del usuario autenticado
router.get('/me', auth, ctrl.me);

// RUTAS PROTEGIDAS (solo admin)

// GET /users - Listar todos los usuarios (solo admin)
router.get('/', auth, permit('admin'), ctrl.list);

// POST /users - Crear nuevo usuario (solo admin)
router.post('/', auth, permit('admin'), ctrl.create);

// PUT /users/:id - Actualizar usuario (solo admin)
router.put('/:id', auth, permit('admin'), ctrl.update);

// DELETE /users/:id - Eliminar usuario (solo admin)
router.delete('/:id', auth, permit('admin'), ctrl.remove);

// PUT /users/:id/change-password - Cambiar contraseña (cualquier usuario autenticado)
router.put('/:id/change-password', auth, ctrl.changePassword);

module.exports = router;