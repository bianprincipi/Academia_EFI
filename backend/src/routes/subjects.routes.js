'use strict';
const router = require('express').Router();
const ctrl = require('../controllers/subjects.controller');

// Resolver middleware auth sin importar cómo esté exportado
let mw = null;
try {
  const mod = require('../middlewares/auth'); // ajustá ruta si tu middleware está en otro archivo
  mw = (typeof mod === 'function') ? mod
    : (typeof mod?.auth === 'function') ? mod.auth
    : (typeof mod?.default === 'function') ? mod.default
    : null;
} catch (e) {
  console.warn('auth middleware no cargado:', e.message);
}
// Fallback dev: si no hay auth, dejar pasar (evita tirar abajo el server)
const auth = mw || ((req, _res, next) => { console.warn('⚠️ sin auth (dev)'); next(); });

// Rutas CRUD
router.get('/', auth, ctrl.list);
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.destroy);

module.exports = router;
