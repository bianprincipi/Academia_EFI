const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auth.controller');

router.post('/login', ctrl.login);
router.post('/forgot-password', ctrl.forgotPassword);
router.post('/reset-password', ctrl.resetPassword);

module.exports = router;
