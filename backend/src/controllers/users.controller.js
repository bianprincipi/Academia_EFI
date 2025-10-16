const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.list = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'isActive', 'createdAt', 'updateAt']
    });
    res.json(users);
  } catch (e) {
    console.error('users.list error:', e);
    res.status(500).json({ message: 'Error al listar usuarios' });
  }
};

exports.me = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    const u = await User.findByPk(req.user.id, {
      attributes: [ 'id', 'name', 'email', 'role', 'isActive' ]
    });
    if (!u) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(u);
  } catch (e) {
    console.error('users.me error:', e);
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //validaciones
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    if (!['admin', 'profesor', 'estudiante'].includes(role)) {
      return res.status(400).json({ message: 'Rol inválido.' });
    }

    //verificar si el email ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }

    //hashear contraseña.
    const hash = await bcrypt.hash(password, 10);

    //crear usuario
    const u = await bcrypt.create({
      name,
      email,
      password: hash,
      role,
      isActive: true
    });

    res.status(201).json({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      isActive: u.isActive
    });
  } catch (e) {
    console.error('user.create error:', e);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, isActive } = req.body;
    
    //validaciones de rol si se actualiza
    if (role && !['admin', 'profesor', 'estudiante'].includes(role)) {
      return res.status(400).json({ message: 'Rol inválido.' });
    }

    const u = await User.findByPk(id);
    if (!u) return res.status(400).json({ message: 'Usuario no encotnrado.' });

    //actualizar solo los campos proporcionados
    if (name !== undefined) u.name = name;
    if (role !== undefined) u.role = role;
    if (isActive !== undefined) u.isActive = isActive;

    await u.save();

    res.json({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      isActive: u.isActive
    });
  } catch (e) {
    console.error('users.update error:', e);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    // No permitir eliminar al propio usuario autenticado
    if (req.user && req.user.id === Number(id)) {
      return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta' });
    }

    const u = await User.findByPk(id);
    if (!u) return res.status(404).json({ message: 'Usuario no encontrado' });

    await u.destroy();
    res.json({ ok: true, message: 'Usuario eliminado' });
  } catch (e) {
    console.error('users.remove error:', e);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Falta oldPassword o newPassword' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Nueva contraseña debe tener al menos 6 caracteres' });
    }

    const u = await User.findByPk(id);
    if (!u) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Verificar contraseña antigua
    const match = await bcrypt.compare(oldPassword, u.password);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    // Hashear y actualizar
    const newHash = await bcrypt.hash(newPassword, 10);
    u.password = newHash;
    await u.save();

    res.json({ ok: true, message: 'Contraseña actualizada' });
  } catch (e) {
    console.error('users.changePassword error:', e);
    res.status(500).json({ message: 'Error al cambiar contraseña' });
  }
};