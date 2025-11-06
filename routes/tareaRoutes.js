// todo-express-backend/routes/tareaRoutes.js

const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const { protect } = require('../middleware/authMiddleware'); // 👈 Importamos el middleware

// 1. Obtener todas las tareas (Ruta GET)
router.get('/', protect, tareaController.obtenerTareas); // 👈 PROTEGIDA

// 2. Crear una tarea (Ruta POST)
router.post('/', protect, tareaController.createTarea); // 👈 PROTEGIDA

// 3. Actualizar una tarea (Ruta PUT)
router.put('/:id', protect, tareaController.actualizarTarea); // 👈 PROTEGIDA

// 4. Eliminar una tarea (Ruta DELETE)
router.delete('/:id', protect, tareaController.eliminarTarea); // 👈 PROTEGIDA

module.exports = router;