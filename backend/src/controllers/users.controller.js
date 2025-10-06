const { User } = require('../models');

exports.list = async (req, res) => {
  const users = await User.findAll({ attributes: ['id','name','email','role','createdAt','updatedAt'] });
  res.json(users);
};

exports.me = async (req, res) => {
  const u = await User.findByPk(req.user.id, { attributes: ['id','name','email','role'] });
  res.json(u);
};

exports.create = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ message:'Datos incompletos' });
  const bcrypt = require('bcrypt');
  const hash = await bcrypt.hash(password, 10);
  const u = await User.create({ name, email, password: hash, role });
  res.status(201).json({ id: u.id, name: u.name, email: u.email, role: u.role });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;
  const u = await User.findByPk(id);
  if (!u) return res.status(404).json({ message:'No encontrado' });
  await u.update({ name: name ?? u.name, role: role ?? u.role });
  res.json({ id: u.id, name: u.name, email: u.email, role: u.role });
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const u = await User.findByPk(id);
  if (!u) return res.status(404).json({ message:'No encontrado' });
  await u.destroy();
  res.json({ ok: true });
};
