const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  nombre: {
    type: String,      // Tipo de dato: número
    required: true
  },
  estado: {
    type: String,
    required: true  
}
});

// Exporta el Modelo: 'Product' es el nombre que usaremos en Express.
// Mongoose pluralizará esto y buscará la colección 'products' en MongoDB.
module.exports = mongoose.model('Tarea', TareaSchema);
