'use strict';
const { Subject } = require('../models');

exports.list = async (req, res) => {
  try {
    const rows = await Subject.findAll({ attributes: ['id','name','description','createdAt','updatedAt'] });
    res.json(rows);
  } catch (e) {
    console.error('subjects.list', e);
    res.status(500).json({ message: 'Error al listar materias' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description } = req.body || {};
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
      return res.status(400).json({ message: 'name inválido (mínimo 3 caracteres)' });
    }
    const row = await Subject.create({ name: name.trim(), description });
    res.status(201).json(row);
  } catch (e) {
    console.error('subjects.create', e);
    res.status(500).json({ message: 'Error al crear materia' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { name, description } = req.body || {};
    const row = await Subject.findByPk(id);
    if (!row) return res.status(404).json({ message: 'Materia no encontrada' });

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length < 3) {
        return res.status(400).json({ message: 'name inválido (mínimo 3 caracteres)' });
      }
      row.name = name.trim();
    }
    if (description !== undefined) row.description = description;

    await row.save();
    res.json(row);
  } catch (e) {
    console.error('subjects.update', e);
    res.status(500).json({ message: 'Error al actualizar materia' });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params || {};
    const row = await Subject.findByPk(id);
    if (!row) return res.status(404).json({ message: 'Materia no encontrada' });
    await row.destroy();
    res.status(204).end();
  } catch (e) {
    console.error('subjects.destroy', e);
    res.status(500).json({ message: 'Error al eliminar materia' });
  }
};
