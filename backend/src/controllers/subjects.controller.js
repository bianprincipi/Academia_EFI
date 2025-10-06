const { Subject } = require('../models');

exports.list = async (req, res) => {
  const rows = await Subject.findAll({
    attributes: ['id','name','description','createdAt','updatedAt']
  });
  res.json(rows);
};

exports.create = async (req, res) => {
  const { name, description } = req.body || {};
  if (!name) return res.status(400).json({ message: 'name requerido' });
  const row = await Subject.create({ name, description });
  res.status(201).json(row);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body || {};
  const row = await Subject.findByPk(id);
  if (!row) return res.status(404).json({ message: 'No encontrado' });
  await row.update({
    name: (name ?? row.name),
    description: (description ?? row.description)
  });
  res.json(row);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const row = await Subject.findByPk(id);
  if (!row) return res.status(404).json({ message: 'No encontrado' });
  await row.destroy();
  res.json({ ok: true });
};
