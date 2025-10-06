const { Class, Subject, User } = require('../models');

exports.list = async (req, res) => {
  const rows = await Class.findAll({
    attributes: ['id','subjectId','teacherId','schedule','room','createdAt','updatedAt'],
    include: [
      { model: Subject, attributes: ['id','name'] },
      { model: User, as: 'teacher', attributes: ['id','name','email'] }
    ]
  });
  res.json(rows);
};

exports.create = async (req, res) => {
  const { subjectId, teacherId, schedule, room } = req.body || {};
  if (!subjectId || !teacherId) {
    return res.status(400).json({ message: 'subjectId y teacherId son requeridos' });
  }
  const row = await Class.create({ subjectId, teacherId, schedule, room });
  res.status(201).json(row);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { schedule, room } = req.body || {};
  const row = await Class.findByPk(id);
  if (!row) return res.status(404).json({ message: 'No encontrado' });
  await row.update({
    schedule: (schedule ?? row.schedule),
    room: (room ?? row.room)
  });
  res.json(row);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const row = await Class.findByPk(id);
  if (!row) return res.status(404).json({ message: 'No encontrado' });
  await row.destroy();
  res.json({ ok: true });
};
