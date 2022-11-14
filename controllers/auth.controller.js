/*
 *req:Solicitud
 *res:Respuesta
 */

const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async(req, res = response) => {
    //obteniendo los datos que la persona escribe
    const { email, password } = req.body;
    try {

        //verificando si el email existe
        const userDB = await Usuario.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            })
        }

        //verificando si la contrasena es la correcta

        const validPassword = bcrypt.compareSync(password, userDB.password) //en esta linea estoy evaluando que la contrasena que escribe el usuario sea igual que la pass de la BD
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña no valido'
            })
        }
        //generar un token
        const token = await generateJWT(userDB.id);


        res.status(200).json({
            ok: true,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const googleSignIn = async(req, res = response) => {

    try {
        const { email, name, picture } = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {

            usuario = usuarioDB;
            usuario.google = true;

        }
        await usuario.save();
        const token = await generateJWT(usuario.id);
        res.json({
            ok: true,
            email,
            name,
            picture,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Token de Google es incorrecto'
        })
    }


}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    //generar un token
    const token = await generateJWT(uid);
    res.json({
        ok: true,
        msg: "Listo para usarse",
        token
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}