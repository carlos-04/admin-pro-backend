/*
 *req:Solicitud
 *res:Respuesta
 */

const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt')

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

module.exports = {
    login
}