const { response } = require('express');
const MedicosModel = require('../models/medico.model');

const getMedicos = async(req, res = response) => {

    try {
        const medicosModel = await MedicosModel.find()
            .populate('usuario', 'nombre img') //con esto estoy viendo que usuario creo el hospital
            .populate('hospital', 'nombre img')
        return res.status(200).json({
            ok: true,
            medicosModel,
            msg: "Obteniendo Medicos"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const createMedicos = async(req, res = response) => {
    const uid = req.uid;
    const medicosModel = new MedicosModel({ usuario: uid, ...req.body });

    try {
        const medicosDB = await medicosModel.save();
        res.status(200).json({
            ok: true,
            medicos: medicosDB,
            msg: "Crear Medicos"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const updateMedicos = (req, res = response) => {

    try {

        return res.status(200).json({
            ok: true,
            msg: "Actualizar Medicos"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const deleteMedicos = (req, res = response) => {

    try {

        return res.status(200).json({
            ok: true,
            msg: "Eliminar Medicos"
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
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
}