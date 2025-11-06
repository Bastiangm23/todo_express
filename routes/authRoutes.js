const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); // Importamos la herramienta
const authController = require('../controllers/authController');

// Ruta POST /api/auth/register con reglas de validación
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('El email no es válido.'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    ],
    authController.registerUser
);

// Ruta POST /api/auth/login
router.post('/login', authController.loginUser); 

module.exports = router;