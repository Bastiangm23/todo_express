const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/tareas_db'; // Cambia esto por tu URL de conexión

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB conectado exitosamente');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    // Salir del proceso con fallo
    process.exit(1);
  }
};

// Llama a la función al iniciar el servidor
connectDB();