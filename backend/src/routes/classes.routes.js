// src/routes/classes.routes.js
const express = require('express');
const router = express.Router();

const { Class, Subject, User } = require('../models');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

/**
 * GET /classes
 * Devuelve todas las clases con su materia y profesor
 * (admin, profesor y estudiante pueden verlas)
 */
router.get('/', auth, async (req, res) => {
  try {
    const classes = await Class.findAll({
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
      order: [['id', 'ASC']],
    });

    return res.json(classes);
  } catch (err) {
    console.error('ERROR GET /classes:', err);
    return res.status(500).json({
      message: 'Error al obtener clases',
      error: err.message,
    });
  }
});

/**
 * POST /classes
 * Crear una nueva clase (solo admin)
 * Body: { subjectId, teacherId, schedule, room }
 */
router.post('/', auth, checkRole('admin'), async (req, res) => {
  try {
    let { subjectId, teacherId, schedule, room } = req.body;

    // 👇 MUY IMPORTANTE: convertir a número
    subjectId = Number(subjectId);
    teacherId = Number(teacherId);

    if (!subjectId || !teacherId || !schedule || !room) {
      return res.status(400).json({
        message: 'subjectId, teacherId, schedule y room son obligatorios',
      });
    }

    // 1) Verificar que exista la materia
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({
        message: `La materia con id ${subjectId} no existe`,
      });
    }

    // 2) Verificar que exista el profesor y tenga rol "profesor"
    const teacher = await User.findByPk(teacherId);
    if (!teacher || teacher.role !== 'profesor') {
      return res.status(400).json({
        message: `El profesor con id ${teacherId} no existe o no es profesor`,
      });
    }

    // 3) Crear la clase
    const nuevaClase = await Class.create({
      subjectId,
      teacherId,
      schedule,
      room,
    });

    // 4) Volver a buscarla con los includes para devolverla "completa"
    const nuevaCompleta = await Class.findByPk(nuevaClase.id, {
      include: [
        { model: Subject, as: 'subject' },
        { model: User, as: 'teacher', attributes: ['id', 'name', 'email'] },
      ],
    });

    return res.status(201).json({
      message: 'Clase creada correctamente',
      class: nuevaCompleta,
    });
  } catch (err) {
    console.error('ERROR POST /classes:', err);
    return res.status(500).json({
      message: 'Error interno al crear clase',
      error: err.message, // por si querés verlo en el Network
    });
  }
});

module.exports = router;
