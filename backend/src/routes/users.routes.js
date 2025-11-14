const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

// IMPORTAMOS LOS MODELOS DESDE ./models/index.js
const path = require('path');
const db = require(path.join(__dirname, '../models/index.js'));
const { User } = db;

// POST /users/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role: role || 'estudiante',
      is_active: true,
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error('ERROR AL REGISTRAR USUARIO:', err);
    return res.status(400).json({ message: err.message });
  }
});

// GET /users/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'is_active'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json(user);
  } catch (err) {
    console.error('ERROR AL OBTENER PERFIL:', err);
    return res.status(500).json({ message: 'Error al obtener perfil' });
  }
});

module.exports = router;
