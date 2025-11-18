const { Grade, User, Class } = require('../models');


// 📌 Crear una nota (solo profesor)
exports.createGrade = async (req, res) => {
  try {
    const { userId, classId, grade, comment } = req.body;

    // validar que exista la clase
    const classFound = await Class.findByPk(classId);
    if (!classFound) {
      return res.status(404).json({ message: 'La clase no existe' });
    }

    // validar que el profesor dueño de la clase es quien califica
    if (req.user.role === 'profesor' && classFound.teacherId !== req.user.id) {
      return res.status(403).json({ message: 'No puedes calificar esta clase' });
    }

    // crear nota
    const newGrade = await Grade.create({
      userId,
      classId,
      grade,
      comment,
    });

    res.status(201).json(newGrade);
  } catch (error) {
    console.error('Error al crear nota:', error);
    res.status(500).json({ message: 'Error al crear la nota' });
  }
};


// 📌 Obtener notas de un estudiante
exports.getGradesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const grades = await Grade.findAll({
      where: { userId: studentId },
      include: [
        {
          model: Class,
          as: 'class', // si definiste asociación
        },
      ],
    });

    res.json(grades);
  } catch (error) {
    console.error('Error al obtener notas:', error);
    res.status(500).json({ message: 'Error al obtener notas' });
  }
};
