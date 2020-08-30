const express = require('express');
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const router = express.Router();

//Crear un tarea


//api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);
//Obtener las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

//actualizar tareas
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

//eliminar una tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)

module.exports = router;