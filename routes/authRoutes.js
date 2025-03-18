const express = require('express');
const { register, login, verifyEmail, getAllUsers } = require('../Controllers/authController');
const router = express.Router();

// Authentication Routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);
// Get all users
router.get('/users', getAllUsers);
module.exports = router;
