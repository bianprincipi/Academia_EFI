// routes/careers.routes.js
const express = require('express');
const router = express.Router();
const careersController = require('../controllers/careers.controller');
const auth = require('../middlewares/auth');
// si tenés un checkRole, lo usamos. Si no, podés hacer la validación a mano.
const checkRole = require('../middlewares/checkRole'); // si existe en tu proyecto

// Public (si querés)
router.get('/', careersController.getAllCareers);
router.get('/:id', careersController.getCareerById);

// Solo admin
router.post('/', auth, checkRole('admin'), careersController.createCareer);
router.put('/:id', auth, checkRole('admin'), careersController.updateCareer);
router.delete('/:id', auth, checkRole('admin'), careersController.deleteCareer);

// Materias de una carrera
router.get('/:id/subjects', auth, careersController.getCareerSubjects);
router.post('/:id/subjects', auth, checkRole('admin'), careersController.addSubjectToCareer);
router.delete(
  '/:id/subjects/:subjectId',
  auth,
  checkRole('admin'),
  careersController.removeSubjectFromCareer
);

module.exports = router;
