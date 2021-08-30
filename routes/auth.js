const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const authController = require('../controllers/auth')

// Check authorization
router.get('/', authController.signin)

// Register a user
router.post('/', [body('email').isEmail,  body('password')],  authController.signup)

module.exports = router;

