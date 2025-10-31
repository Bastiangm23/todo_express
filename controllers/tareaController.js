const Tarea = require('../models/Tarea');

exports.obtenerTareas = async (req, res) => {
    try {
        const tareasDB = await Tarea.find();
        res.send(tareasDB);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.crearTarea = async (req, res) => {
    try {
        const nuevaTarea = new Tarea(req.body); // 1. Crea una instancia del modelo con los datos del body
        const tarea = await nuevaTarea.save();   // 2. Guarda el objeto en MongoDB
        res.status(201).json(tarea);
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 Bad Request si falla la validación
    }
}

exports.eliminarTarea = async (req, res) => {
    try {
        const id_tarea = req.params.id;
        
        // findByIdAndDelete: Busca el documento por ID y lo elimina de la colección
        const tarea_eliminada = await Tarea.findByIdAndDelete(id_tarea);

        if (!tarea_eliminada) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        // 204 No Content es la respuesta RESTful correcta para una eliminación exitosa sin cuerpo de respuesta
        res.status(204).send(); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.actualizarTarea = async (req, res) => {
    try {
        const id_tarea = req.params.id;
        
        // findByIdAndUpdate: Busca el documento por su ID de MongoDB y aplica el update.
        // { new: true }: Asegura que la función devuelva el documento YA ACTUALIZADO, no el viejo.
        const tarea_actualizada = await Tarea.findByIdAndUpdate(id_tarea, req.body, { new: true, runValidators: true });

        if (!tarea_actualizada) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(tarea_actualizada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

