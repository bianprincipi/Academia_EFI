// routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /auth/login
router.post('/login', authController.login);

// POST /auth/forgot-password
router.post('/forgot-password', authController.forgotPassword);

// POST /auth/reset-password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
