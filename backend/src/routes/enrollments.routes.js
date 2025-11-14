// routes/enrollments.routes.js
const express = require('express');
const router = express.Router();
const { Enrollment, Class, Subject, User } = require('../models');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

/**
 * POST /enrollments
 * Inscribir a un estudiante en una clase
 * Body: { classId }
 * Rol requerido: estudiante
 */
router.post('/', auth, checkRole('estudiante'), async (req, res) => {
  try {
    const { classId } = req.body;
    const userId = req.user.id; // viene del token

    if (!classId) {
      return res.status(400).json({ message: 'classId es obligatorio' });
    }

    // Verificar que la clase exista
    const cls = await Class.findByPk(classId);
    if (!cls) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    // Evitar inscripción duplicada
    const existing = await Enrollment.findOne({
      where: { userId, classId },
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: 'Ya estás inscripto en esta clase' });
    }

    const enrollment = await Enrollment.create({
      userId,
      classId,
      enrollmentDate: new Date(),
    });

    res.status(201).json(enrollment);
  } catch (err) {
    console.error('ERROR AL INSCRIBIR:', err);
    res.status(400).json({ message: 'Error al inscribirse en la clase' });
  }
});

/**
 * GET /enrollments/:id_usuario
 * Obtener inscripciones de un estudiante
 * - Admin puede ver cualquiera
 * - Estudiante solo puede ver las suyas
 */
router.get('/:id_usuario', auth, async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const userId = Number(id_usuario);

    // Solo admin o el propio estudiante
    if (req.user.role !== 'admin' && userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'No puedes ver inscripciones de otros usuarios' });
    }

    const enrollments = await Enrollment.findAll({
      where: { userId },
      include: [
        {
          model: Class,
          include: [
            { model: Subject }, // materia de la clase
            {
              model: User,
              as: 'teacher', // alias definido en models/index.js
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
      order: [['id', 'ASC']],
    });

    res.json(enrollments);
  } catch (err) {
    console.error('ERROR AL OBTENER INSCRIPCIONES:', err);
    res.status(500).json({ message: 'Error al obtener inscripciones' });
  }
});

/**
 * DELETE /enrollments/:id
 * Cancelar inscripción
 * - Admin puede cancelar cualquiera
 * - Estudiante solo puede cancelar las suyas
 */
router.delete(
  '/:id',
  auth,
  checkRole('admin', 'estudiante'),
  async (req, res) => {
    try {
      const enrollment = await Enrollment.findByPk(req.params.id);
      if (!enrollment) {
        return res
          .status(404)
          .json({ message: 'Inscripción no encontrada' });
      }

      // Si es estudiante, solo puede cancelar la suya
      if (
        req.user.role === 'estudiante' &&
        enrollment.userId !== req.user.id
      ) {
        return res.status(403).json({
          message: 'No puedes cancelar la inscripción de otro estudiante',
        });
      }

      await enrollment.destroy();
      res.json({ message: 'Inscripción cancelada' });
    } catch (err) {
      console.error('ERROR AL CANCELAR INSCRIPCIÓN:', err);
      res.status(400).json({ message: 'Error al cancelar inscripción' });
    }
  }
);

module.exports = router;
