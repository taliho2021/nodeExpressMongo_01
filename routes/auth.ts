import express from 'express'
const router = express.Router()
const authController = require('../controllers/auth')
const verifySignUp = require('../middleware/verifySignUp')

// Check authorization  localhost:8080/auth/
router.get('/', authController.signin)

// Register a user   localhost:8080/auth/signup
router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],  authController.signup)

// Check the credentials  localhost:8080/auth/signin
router.post('/signin', authController.signin)

module.exports = router;

