const { response } = require('express');
const HospitalModel = require('../models/hospital.model');

const getHospitales = async(req, res = response) => {

    try {
        const hospitalModel = await HospitalModel.find()
            .populate('usuario', 'nombre'); //con esto estoy viendo que usuario creo el hospital
        return res.status(200).json({
            ok: true,
            hospitalModel,
            msg: "Obteniendo Hospitales"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const createHospitales = async(req, res = response) => {
    //obteniendo el id del usuario que esta logeado
    const uid = req.uid;

    hospitalModel = new HospitalModel({
        usuario: uid,
        ...req.body
    });

    try {
        //metodo para guardar el posteo en una base de datos
        const hospitalDB = await hospitalModel.save();
        res.status(200).json({
            ok: true,
            hospital: hospitalDB,
            msg: "Crear Hospitales",
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const updateHospitales = (req, res = response) => {

    try {

        return res.status(200).json({
            ok: true,
            msg: "Actualizar Hospitales"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const deleteHospitales = (req, res = response) => {

    try {

        return res.status(200).json({
            ok: true,
            msg: "Eliminar Hospitales"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

module.exports = {
    getHospitales,
    createHospitales,
    updateHospitales,
    deleteHospitales
}