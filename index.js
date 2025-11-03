const express = require ("express");
const tareaController = require("./controllers/tareaController");
const authController = require('./controllers/authController'); 
const { protect } = require('./middleware/authMiddleware');
const cors = require('cors');
require('dotenv').config();
// ...

// Esto permite que CUALQUIER dominio acceda a tu API (fácil para desarrollo)

require('./db')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
    
app.get("/", protect, tareaController.obtenerTareas);

app.post("/crear_tarea", protect, tareaController.crearTarea);

app.delete("/eliminar_tarea/:id", protect, tareaController.eliminarTarea);

app.put("/actualizar_tarea/:id", protect, tareaController.actualizarTarea);


app.post("/auth/register", authController.registerUser); 

app.post("/auth/login", authController.loginUser);      


app.listen(port, () =>{
    console.log(`El servidor esta corriendo en el puerto: ${port}`);
})
