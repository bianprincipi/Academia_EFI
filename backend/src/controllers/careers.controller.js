// controllers/careers.controller.js
const { Career, Subject, CareerSubject } = require('../models');

exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.findAll({
      include: [
        {
          model: Subject,
          as: 'subjects',
          through: { attributes: [] },
        },
      ],
      order: [['id', 'ASC']],
    });
    res.json(careers);
  } catch (error) {
    console.error('Error al obtener carreras:', error);
    res.status(500).json({ message: 'Error al obtener carreras' });
  }
};

exports.getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findByPk(id, {
      include: [
        {
          model: Subject,
          as: 'subjects',
          through: { attributes: [] },
        },
      ],
    });

    if (!career) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }

    res.json(career);
  } catch (error) {
    console.error('Error al obtener carrera:', error);
    res.status(500).json({ message: 'Error al obtener carrera' });
  }
};

exports.createCareer = async (req, res) => {
  try {
    const { name, description, durationYears } = req.body;
    const career = await Career.create({ name, description, durationYears });
    res.status(201).json(career);
  } catch (error) {
    console.error('Error al crear carrera:', error);
    res.status(500).json({ message: 'Error al crear carrera' });
  }
};

exports.updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, durationYears } = req.body;

    const career = await Career.findByPk(id);
    if (!career) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }

    career.name = name ?? career.name;
    career.description = description ?? career.description;
    career.durationYears = durationYears ?? career.durationYears;

    await career.save();

    res.json(career);
  } catch (error) {
    console.error('Error al actualizar carrera:', error);
    res.status(500).json({ message: 'Error al actualizar carrera' });
  }
};

exports.deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findByPk(id);

    if (!career) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }

    await career.destroy();
    res.json({ message: 'Carrera eliminada' });
  } catch (error) {
    console.error('Error al eliminar carrera:', error);
    res.status(500).json({ message: 'Error al eliminar carrera' });
  }
};

/**
 * GET /careers/:id/subjects
 */
exports.getCareerSubjects = async (req, res) => {
  try {
    const { id } = req.params;

    const career = await Career.findByPk(id, {
      include: [
        {
          model: Subject,
          as: 'subjects',
          through: { attributes: [] },
        },
      ],
    });

    if (!career) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }

    res.json({
      careerId: career.id,
      careerName: career.name,
      subjects: career.subjects,
    });
  } catch (error) {
    console.error('Error al obtener materias de la carrera:', error);
    res.status(500).json({ message: 'Error al obtener materias de la carrera' });
  }
};

/**
 * POST /careers/:id/subjects
 * body: { subjectId }
 */
exports.addSubjectToCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const { subjectId } = req.body;

    const career = await Career.findByPk(id);
    if (!career) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }

    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Asignatura no encontrada' });
    }

    // Evitar duplicados
    const existing = await CareerSubject.findOne({
      where: { careerId: id, subjectId },
    });
    if (existing) {
      return res.status(400).json({ message: 'La materia ya está asociada a esta carrera' });
    }

    await CareerSubject.create({ careerId: id, subjectId });

    res.status(201).json({
      message: 'Asignatura agregada a la carrera correctamente',
    });
  } catch (error) {
    console.error('Error al agregar materia a la carrera:', error);
    res.status(500).json({ message: 'Error al agregar materia a la carrera' });
  }
};

/**
 * DELETE /careers/:id/subjects/:subjectId
 */
exports.removeSubjectFromCareer = async (req, res) => {
  try {
    const { id, subjectId } = req.params;

    const existing = await CareerSubject.findOne({
      where: { careerId: id, subjectId },
    });

    if (!existing) {
      return res.status(404).json({
        message: 'La materia no está asociada a esta carrera',
      });
    }

    await existing.destroy();

    res.json({ message: 'Asignatura removida de la carrera' });
  } catch (error) {
    console.error('Error al remover materia de la carrera:', error);
    res.status(500).json({ message: 'Error al remover materia de la carrera' });
  }
};
