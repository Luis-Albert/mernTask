const express = require('express');
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const router = express.Router();

//api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    ],
    proyectoController.crearProyecto
);

//Obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

//actualizar los proyectos via ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    ],
    proyectoController.actualizarProyecto
);

//Eliminar los proyectos

router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);


module.exports = router;