// routes/classes.routes.js
const express = require('express');
const router = express.Router();
const { Class, Subject, User } = require('../models');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

// GET /classes - todas las clases (requiere login)
router.get('/', auth, async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: [
        { model: Subject, as: 'subject' },
        { model: User, as: 'professor', attributes: ['id', 'name', 'email'] },
      ],
    });
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener clases' });
  }
});

// POST /classes - solo admin
router.post('/', auth, checkRole('admin'), async (req, res) => {
  try {
    const { subjectId, professorId, horario, salon } = req.body;

    const newClass = await Class.create({
      id_asignatura: subjectId,
      id_profesor: professorId,
      horario,
      salon,
    });

    res.status(201).json(newClass);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error al crear clase' });
  }
});

// PUT /classes/:id - admin o profesor asignado
router.put('/:id', auth, checkRole('admin', 'profesor'), async (req, res) => {
  try {
    const clase = await Class.findByPk(req.params.id);

    if (!clase) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    // Si es profesor, solo puede modificar su propia clase
    if (req.user.role === 'profesor' && clase.id_profesor !== req.user.id) {
      return res.status(403).json({ message: 'No puedes modificar clases de otros profesores' });
    }

    let dataToUpdate = req.body;

    // Si es profesor, limitamos campos que puede modificar
    if (req.user.role === 'profesor') {
      dataToUpdate = {
        horario: req.body.horario ?? clase.horario,
        salon: req.body.salon ?? clase.salon,
      };
    }

    await clase.update(dataToUpdate);
    res.json(clase);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error al actualizar clase' });
  }
});

// DELETE /classes/:id - solo admin
router.delete('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const clase = await Class.findByPk(req.params.id);
    if (!clase) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    await clase.destroy();
    res.json({ message: 'Clase eliminada' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error al eliminar clase' });
  }
});

module.exports = router;
