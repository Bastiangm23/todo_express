// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importar bcryptjs para encriptar contraseñas

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // ¡IMPORTANTE! El email debe ser único
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // ¡IMPORTANTE! No devuelve el hash de la contraseña por defecto en las consultas
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ----------------------------------------------------
// Middleware de Pre-guardado (Pre-save Middleware)
// ----------------------------------------------------

// Antes de guardar (antes de new User().save()), ejecuta esta función.
UserSchema.pre('save', async function(next) {
  // Solo hashear la contraseña si ha sido modificada (o es nueva)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generar el salt (cadena aleatoria)
    const salt = await bcrypt.genSalt(10);
    
    // Hashear la contraseña usando el salt
    this.password = await bcrypt.hash(this.password, salt);
    
    next(); // Continuar con el proceso de guardado
  } catch (err) {
    next(err); // Pasar el error a Mongoose
  }
});


// ----------------------------------------------------
// Método para Comparar Contraseñas
// ----------------------------------------------------

// Añade un método al esquema para verificar la contraseña
UserSchema.methods.matchPassword = async function(enteredPassword) {
  // Compara la contraseña ingresada con la contraseña hasheada guardada en la base de datos
  // this.password accede al valor del campo 'password', incluso si 'select: false'
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);