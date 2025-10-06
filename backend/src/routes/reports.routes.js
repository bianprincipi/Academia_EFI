const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const ctrl = require('../controllers/reports.controller');

router.get('/student-schedule/:userId', auth, ctrl.studentSchedule);
router.get('/class-roster/:classId', auth, ctrl.classRoster);

module.exports = router;
