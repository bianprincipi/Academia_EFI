// routes/grades.routes.js
const express = require('express');
const router = express.Router();
const { Grade, Class, User } = require('../models');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

/**
 * POST /grades
 * Profesores (o admin) crean notas
 * Body: { userId, classId, grade, comment }
 */
router.post(
  '/',
  auth,
  checkRole('profesor', 'admin'),
  async (req, res) => {
    try {
      const { userId, classId, grade, comment } = req.body;

      if (!userId || !classId || grade == null) {
        return res
          .status(400)
          .json({ message: 'userId, classId y grade son obligatorios' });
      }

      const nueva = await Grade.create({
        userId,
        classId,
        grade,
        comment: comment || null,
      });

      res.status(201).json(nueva);
    } catch (err) {
      console.error('ERROR AL AGREGAR NOTA:', err);
      res.status(500).json({ message: 'Error al registrar la nota' });
    }
  }
);

/**
 * GET /grades/:userId
 * Ver notas de un estudiante
 * - Estudiante solo puede ver sus propias notas
 * - Admin o profesor pueden ver las de cualquiera
 */
router.get('/:userId', auth, async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    // Estudiante solo ve sus notas
    if (req.user.role === 'estudiante' && req.user.id !== userId) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const notas = await Grade.findAll({
      where: { userId },
      include: [
        {
          model: Class,
          // Si más adelante querés, acá podés incluir Subject y teacher también
        },
      ],
      order: [['id', 'ASC']],
    });

    res.json(notas);
  } catch (err) {
    console.error('ERROR AL OBTENER NOTAS:', err);
    res.status(500).json({ message: 'Error al obtener notas' });
  }
});

/**
 * PUT /grades/:id
 * Profesor o admin puede modificar notas
 */
router.put(
  '/:id',
  auth,
  checkRole('profesor', 'admin'),
  async (req, res) => {
    try {
      const { grade, comment } = req.body;
      const { id } = req.params;

      const nota = await Grade.findByPk(id);
      if (!nota) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }

      if (grade != null) nota.grade = grade;
      if (comment != null) nota.comment = comment;

      await nota.save();

      res.json(nota);
    } catch (err) {
      console.error('ERROR AL EDITAR NOTA:', err);
      res.status(500).json({ message: 'Error al modificar la nota' });
    }
  }
);

module.exports = router;
