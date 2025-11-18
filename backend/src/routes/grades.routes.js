// routes/grades.routes.js
const express = require('express');
const router = express.Router();

const { Grade, Class, User, Subject } = require('../models');
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

      // Verificar que el usuario exista y sea estudiante
      const estudiante = await User.findByPk(userId);
      if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      if (estudiante.role !== 'estudiante') {
        return res
          .status(400)
          .json({ message: 'userId debe pertenecer a un estudiante' });
      }

      // Verificar que la clase exista
      const clase = await Class.findByPk(classId);
      if (!clase) {
        return res.status(404).json({ message: 'Clase no encontrada' });
      }

      // Si es profesor, solo puede calificar sus clases
      if (req.user.role === 'profesor' && clase.teacherId !== req.user.id) {
        return res
          .status(403)
          .json({ message: 'No autorizado para calificar esta clase' });
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

    if (Number.isNaN(userId)) {
      return res.status(400).json({ message: 'userId debe ser numérico' });
    }

    // Estudiante solo ve sus notas
    if (req.user.role === 'estudiante' && req.user.id !== userId) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const notas = await Grade.findAll({
      where: { userId },
      include: [
        {
          model: Class,
          as: 'class',
          include: [
            {
              model: Subject,
              as: 'subject',
            },
            {
              model: User,
              as: 'teacher',
              attributes: ['id', 'name', 'email'],
            },
          ],
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
 * - Profesor solo puede editar notas de sus clases
 * - Admin puede editar cualquier nota
 */
router.put(
  '/:id',
  auth,
  checkRole('profesor', 'admin'),
  async (req, res) => {
    try {
      const { grade, comment } = req.body;
      const { id } = req.params;

      const nota = await Grade.findByPk(id, {
        include: [
          {
            model: Class,
            as: 'class',
          },
        ],
      });

      if (!nota) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }

      // Si es profesor, validar que la clase sea suya
      if (
        req.user.role === 'profesor' &&
        nota.class &&
        nota.class.teacherId !== req.user.id
      ) {
        return res
          .status(403)
          .json({ message: 'No autorizado para modificar esta nota' });
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
