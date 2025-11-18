// controllers/classController.js

const { Class, Subject, User } = require('../models');

exports.createClass = async (req, res) => {
  try {
    let { subjectId, teacherId, schedule, room } = req.body;

    // Convertir IDs a número (FUNDAMENTAL)
    subjectId = Number(subjectId);
    teacherId = Number(teacherId);

    if (!subjectId || !teacherId || !schedule || !room) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    // Buscar la materia
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({
        message: `La materia con id ${subjectId} no existe`
      });
    }

    // Buscar profesor
    const teacher = await User.findByPk(teacherId);
    if (!teacher || teacher.role !== 'profesor') {
      return res.status(400).json({
        message: `El profesor con id ${teacherId} no existe o no es profesor`
      });
    }

    // Crear clase
    const nuevaClase = await Class.create({
      subjectId,
      teacherId,
      schedule,
      room,
    });

    res.status(201).json({
      message: "Clase creada correctamente",
      class: nuevaClase
    });

  } catch (err) {
    console.error("Error al crear clase:", err);
    res.status(500).json({
      message: "Error interno del servidor",
      error: err.message
    });
  }
};
