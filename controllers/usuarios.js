/**
 *Este es mi controlador de usuarios
 req:Solicitud
 res:Respuesta
 */
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async(req, res) => {
        const qty = Number(req.query.qty) || 0;
        //ejecutando promesas simultaneamente
        const [usuarios, total] = await Promise.all([
            Usuario.find({}, "nombre email password role google img")
            .skip(qty)
            .limit(5),
            Usuario.countDocuments()
        ])

        res.json({
            ok: true,
            usuarios,
            total
        })
    }
    //crear usuarios
const createUsers = async(req, res = response) => {
        //desestructurando el cuerpo
        const { password, email } = req.body;
        try {
            //validacion del correo ya existe
            //cuando hago el await lo que quiere decir es que nada se ejecutara hasta que se ejecute esa linea de codigo
            const existeEmail = await Usuario.findOne({ email })
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya existe'
                })
            }
            const usuario = new Usuario(req.body);

            //encriptando el password
            //bcrypt.genSaltSync me genera un codigo aleatorio
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);


            //metodo para guardar el posteo en una base de datos
            await usuario.save();

            //generar un token
            const token = await generateJWT(usuario.id);
            res.json({
                ok: true,
                usuario,
                token
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Error inesperado"
            });
        }
    }
    //actualizar usuarios
const updateUser = async(req, res = response) => {
        //obteniedo el id
        const uid = req.params.id;
        // const { req } = req.body;
        try {
            const userDB = await Usuario.findById(uid);
            if (!userDB) {
                res.status(404).json({
                    ok: false,
                    msg: "No existe un usuario por ese id"
                })
            }

            //actualizar desde la BD
            const { password, google, email, ...campos } = req.body;
            if (userDB.email !== email) {
                const emailExiste = await Usuario.findOne({ email });
                if (emailExiste) {
                    return res.status(400).json({
                        ok: false,
                        msg: "Ya existe un usuario con este email"
                    })
                }
            }
            campos.email = email;
            //campos que no quiero actualizar
            // delete campos.password;
            // delete campos.google;

            //actualizar desde la BD
            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
            res.json({

                ok: true,
                usuario: usuarioActualizado
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Error inesperado"
            })

        }
    }
    //eliminar usuarios
const deleteUser = async(req, res = response) => {
    //obteniedo el id
    const uid = req.params.id;

    try {
        const userDB = await Usuario.findById(uid);
        //si el id no existe le marco este error
        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id"
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
}


module.exports = {
    getUsers,
    createUsers,
    updateUser,
    deleteUser
}