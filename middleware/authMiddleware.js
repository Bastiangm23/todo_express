const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Necesario para buscar al usuario por ID

// ⚠️ Usar el mismo secreto definido en authController.js (idealmente cargado desde .env)
const JWT_SECRET = 'TU_SECRETO_SUPER_SEGURO_Y_LARGO'; 

// Función de middleware que se insertará en las rutas protegidas
const protect = async (req, res, next) => {
  let token;

  // 1. Verificar la cabecera de Autorización
  // Se espera el formato: 'Bearer <TOKEN>'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token de la cadena "Bearer <TOKEN>"
      token = req.headers.authorization.split(' ')[1];

      // 2. Decodificar/Verificar el Token
      // Si el token es inválido o expiró, jwt.verify lanzará un error.
      const decoded = jwt.verify(token, JWT_SECRET);

      // 3. Buscar el usuario
      // El ID del usuario fue codificado en el token.
      // .select('-password') asegura que NO traigamos el hash de la contraseña.
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no encontrado. Token inválido.' });
      }

      // 4. Si todo es válido, continuar al siguiente middleware o a la función del controlador
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'No autorizado, token fallido o expirado.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no se encontró token.' });
  }
};

module.exports = { protect };