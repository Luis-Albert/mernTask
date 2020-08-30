const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');

exports.authenticarUsuario = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    };



    //extraer el email y password
    const { email, password } = req.body;

    try {

        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }
        //Reviar el password
        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'El password es incorrecto' });
        }

        //Si todo es correcto, Crear y firmar el JWT

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1hora
        }, (error, token) => {

            if (error) throw error;

            //Mensaje de confirmacion
            res.json({ token });

        });

    } catch (error) {
        console.log(error)

    }

}

//Obtiene que usuario esta autenticado

exports.usuarioAutenticado = async (req, res) => {

    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({ usuario });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');

    }
}