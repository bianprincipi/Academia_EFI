// routes/attendance.routes.js
const express = require('express');
const router = express.Router();
const { Attendance, Class, User, Enrollment } = require('../models');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

/**
 * POST /attendance
 * Registrar asistencia de un estudiante a una clase en una fecha
 * Body: { userId, classId, date, status }
 * status ∈ ['present','absent','late']
 */
router.post('/', auth, checkRole('profesor', 'admin'), async (req, res) => {
  try {
    const { userId, classId, date, status } = req.body;

    if (!userId || !classId) {
      return res
        .status(400)
        .json({ message: 'userId y classId son obligatorios' });
    }

    // Chequeo simple: que la clase exista
    const cls = await Class.findByPk(classId);
    if (!cls) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    // Opcional: que el estudiante esté inscripto en la clase
    const enrollment = await Enrollment.findOne({ where: { userId, classId } });
    if (!enrollment) {
      return res
        .status(400)
        .json({ message: 'El estudiante no está inscripto en esta clase' });
    }

    // Evitar duplicados: un registro por día / estudiante / clase
    const existing = await Attendance.findOne({
      where: {
        userId,
        classId,
        date: date || new Date().toISOString().slice(0, 10),
      },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: 'Ya existe asistencia para ese día' });
    }

    const nueva = await Attendance.create({
      userId,
      classId,
      date: date || new Date().toISOString().slice(0, 10),
      status: status || 'present',
    });

    res.status(201).json(nueva);
  } catch (err) {
    console.error('ERROR AL REGISTRAR ASISTENCIA:', err);
    res.status(500).json({ message: 'Error al registrar asistencia' });
  }
});

/**
 * GET /attendance/class/:classId
 * Ver asistencias de una clase (opcional ?date=YYYY-MM-DD)
 * Rol: profesor o admin
 */
router.get(
  '/class/:classId',
  auth,
  checkRole('profesor', 'admin'),
  async (req, res) => {
    try {
      const { classId } = req.params;
      const { date } = req.query;

      const where = { classId };
      if (date) where.date = date;

      const registros = await Attendance.findAll({
        where,
        include: [
          {
            model: User,
            as: 'student',
            attributes: ['id', 'name', 'email'],
          },
        ],
        order: [['date', 'ASC'], ['userId', 'ASC']],
      });

      res.json(registros);
    } catch (err) {
      console.error('ERROR AL OBTENER ASISTENCIAS:', err);
      res.status(500).json({ message: 'Error al obtener asistencias' });
    }
  }
);

/**
 * GET /attendance/student/:userId
 * Ver asistencias de un estudiante
 * - Estudiante solo ve las suyas
 * - Profesor/Admin pueden ver cualquiera
 */
router.get('/student/:userId', auth, async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (req.user.role === 'estudiante' && req.user.id !== userId) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const registros = await Attendance.findAll({
      where: { userId },
      include: [{ model: Class }],
      order: [['date', 'DESC']],
    });

    res.json(registros);
  } catch (err) {
    console.error('ERROR AL OBTENER ASISTENCIAS DEL ESTUDIANTE:', err);
    res.status(500).json({ message: 'Error al obtener asistencias' });
  }
});

/**
 * PUT /attendance/:id
 * Modificar un registro de asistencia
 * Rol: profesor o admin
 */
router.put(
  '/:id',
  auth,
  checkRole('profesor', 'admin'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status, date } = req.body;

      const registro = await Attendance.findByPk(id);
      if (!registro) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }

      if (status) registro.status = status;
      if (date) registro.date = date;

      await registro.save();

      res.json(registro);
    } catch (err) {
      console.error('ERROR AL EDITAR ASISTENCIA:', err);
      res.status(500).json({ message: 'Error al modificar asistencia' });
    }
  }
);

module.exports = router;
