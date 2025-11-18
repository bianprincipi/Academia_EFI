const express = require('express');
const router = express.Router();
const { Enrollment, Class, Subject, User } = require('../models');
const auth = require('../middlewares/auth');

// POST /enrollments
router.post('/', auth, async (req, res) => {
  try {
    const { classId, userId: bodyUserId } = req.body;

    if (!classId) {
      return res.status(400).json({ message: 'classId es obligatorio' });
    }

    let userId = req.user.id;
    if (req.user.role === 'admin' && bodyUserId) {
      userId = bodyUserId;
    }

    // Verificar que la clase exista
    const clase = await Class.findByPk(classId);
    if (!clase) {
      return res.status(404).json({ message: 'La clase no existe' });
    }

    // Evitar duplicados
    const existing = await Enrollment.findOne({ where: { userId, classId } });
    if (existing) {
      return res
        .status(400)
        .json({ message: 'El estudiante ya está inscripto en esta clase' });
    }

    const enr = await Enrollment.create({
      userId,
      classId,
      enrolledAt: new Date(),
    });

    res.status(201).json(enr);
  } catch (err) {
    console.error('ERROR POST /enrollments:', err);
    res.status(500).json({ message: 'Error al inscribir' });
  }
});

// GET /enrollments/:userId
router.get('/:userId', auth, async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (req.user.role === 'estudiante' && req.user.id !== userId) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const enrollments = await Enrollment.findAll({
      where: { userId },
      include: [
        {
          model: Class,
          as: 'class',
          include: [
            { model: Subject, as: 'subject' },
            { model: User, as: 'teacher', attributes: ['id', 'name', 'email'] },
          ],
        },
      ],
      order: [['id', 'ASC']],
    });

    res.json(enrollments);
  } catch (err) {
    console.error('ERROR GET /enrollments/:userId:', err);
    res.status(500).json({ message: 'Error al obtener inscripciones' });
  }
});

// DELETE /enrollments/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const enr = await Enrollment.findByPk(req.params.id);

    if (!enr) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }

    if (req.user.role === 'estudiante' && enr.userId !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await enr.destroy();
    res.json({ message: 'Inscripción cancelada' });
  } catch (err) {
    console.error('ERROR DELETE /enrollments/:id:', err);
    res.status(500).json({ message: 'Error al cancelar inscripción' });
  }
});

module.exports = router;
