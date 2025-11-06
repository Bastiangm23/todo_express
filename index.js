const express = require ("express");
const tareaController = require("./controllers/tareaController");
const authController = require('./controllers/authController'); 
const { protect } = require('./middleware/authMiddleware');
const cors = require('cors');
require('dotenv').config();

// Importar los archivos de rutas
const authRoutes = require('./routes/authRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
// ...

// Esto permite que CUALQUIER dominio acceda a tu API (fácil para desarrollo)

require('./db')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
    
app.use("/", authRoutes); 


app.use("/auth", authRoutes); 

app.listen(port, () =>{
    console.log(`El servidor esta corriendo en el puerto: ${port}`);
})
