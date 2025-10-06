'use strict';
const router = require('express').Router();

// Intentamos cargar el middleware de distintas formas posibles
let mw = null;
try {
  const mod = require('../middlewares/auth'); // ajusta a tu ruta real si difiere
  mw = (typeof mod === 'function')
    ? mod
    : (typeof mod?.auth === 'function')
      ? mod.auth
      : (typeof mod?.default === 'function')
        ? mod.default
        : null;
} catch (e) {
  console.error('No se pudo cargar ../middlewares/auth:', e.message);
}

const auth = mw || ((req, res, next) => {
  console.warn('⚠️  Middleware auth no encontrado. Continuando sin validar (solo para desarrollo).');
  next();
});

// GET /users/me  -> devuelve el usuario del token (o placeholder si no hay auth real)
router.get('/me', auth, (req, res) => {
  if (!req.user) {
    return res.json({ id: null, role: 'guest' });
  }
  res.json({ id: req.user.id, role: req.user.role, email: req.user.email });
});

module.exports = router;
