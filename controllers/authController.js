// controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// ⚠️ Asegúrate de crear un archivo .env o usar una variable de entorno para tu secreto
// Por ahora, usaremos un string fijo solo para el ejemplo.
const JWT_SECRET = process.env.JWT_SECRET; 

// Función auxiliar para generar el Token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '1d', // El token expira en 1 día
  });
};

// ---------------------------------------------
// 🟢 1. REGISTRO (POST /api/auth/register)
// ---------------------------------------------
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe con ese email.' });
    }

    // 2. Crear un nuevo usuario. El middleware 'pre-save' se encargará de hashear la contraseña.
    const user = await User.create({
      email,
      password,
    });

    // 3. Respuesta exitosa: devolver los datos del usuario y el Token
    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------
// 🟡 2. LOGIN (POST /api/auth/login)
// ---------------------------------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar al usuario por email, incluyendo el campo 'password' (select: false)
    const user = await User.findOne({ email }).select('+password'); 

    // 2. Verificar: Usuario existe Y la contraseña coincide
    // El método matchPassword fue definido en models/User.js
    if (user && (await user.matchPassword(password))) {
      
      // 3. Respuesta exitosa: devolver los datos del usuario y el Token
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Email o contraseña inválidos.' }); // 401 Unauthorized
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};