/**
 *Este es mi controlador de usuarios
 req:Solicitud
 res:Respuesta
 */
const { response } = require('express');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital.model');
const Medicos = require('../models/medico.model');


//obteniendo un filtro con los 3 modelos
const getTodo = async(req, res = response) => {
        const busqueda = req.params.busqueda;
        const regex = RegExp(busqueda, 'i');
        try {
            //Aqui lo que estoy haciendo es que hasta que no se ejecuten las 3 promesas no me traera resultados
            const [usuarios, hospital, medicos] = await Promise.all([
                Usuario.find({ nombre: regex }),
                Hospital.find({ nombre: regex }),
                Medicos.find({ nombre: regex })
            ])

            res.status(200).json({
                ok: true,
                usuarios,
                hospital,
                medicos,
                msg: "Correcto"
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Error inesperado"
            })
        }
    }
    //obteniendo un filtrode un modelo en especifico
const getDocumentColeccion = async(req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = RegExp(busqueda, 'i');
    let data = [];
    try {
        switch (tabla) {
            case 'medicos':
                data = await Medicos.find({ nombre: regex })
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img')
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                    .populate('usuario', 'nombre img');
                break;
            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla debe de ser medicos,hospitales,usuarios'
                })

        }
        res.status(200).json({
            ok: true,
            resultado: data,
            msg: "Correcto"
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
    getTodo,
    getDocumentColeccion
}