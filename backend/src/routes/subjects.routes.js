// src/routes/subjects.routes.js

const express = require('express');
const router = express.Router();
const path = require('path');

const db = require(path.join(__dirname, '../models/index.js'));
const { Subject } = db;

const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

/**
 * GET /subjects
 * Lista todas las asignaturas
 */
router.get('/', auth, async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      order: [['id', 'ASC']],
    });
    return res.json(subjects);
  } catch (err) {
    console.error('ERROR AL OBTENER ASIGNATURAS:', err);
    return res.status(500).json({ message: 'Error al obtener asignaturas' });
  }
});

/**
 * POST /subjects
 * Crea una nueva asignatura (solo admin)
 */
router.post('/', auth, checkRole('admin'), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const subject = await Subject.create({ name, description });
    return res.status(201).json(subject);
  } catch (err) {
    console.error('ERROR AL CREAR ASIGNATURA:', err);
    return res.status(500).json({ message: 'Error al crear asignatura' });
  }
});

/**
 * PUT /subjects/:id
 * Actualiza una asignatura (solo admin)
 */
router.put('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ message: 'Asignatura no encontrada' });
    }

    await subject.update({
      name: name ?? subject.name,
      description: description ?? subject.description,
    });

    return res.json(subject);
  } catch (err) {
    console.error('ERROR AL ACTUALIZAR ASIGNATURA:', err);
    return res.status(500).json({ message: 'Error al actualizar asignatura' });
  }
});

/**
 * DELETE /subjects/:id
 * Elimina una asignatura (solo admin)
 */
router.delete('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ message: 'Asignatura no encontrada' });
    }

    await subject.destroy();

    return res.json({ message: 'Asignatura eliminada' });
  } catch (err) {
    console.error('ERROR AL ELIMINAR ASIGNATURA:', err);
    return res.status(500).json({ message: 'Error al eliminar asignatura' });
  }
});

module.exports = router;
