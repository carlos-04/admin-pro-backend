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

const updateHospitales = async(req, res = response) => {
    //obteniedo el id
    const id = req.params.id;
    //obteniendo el id del usuario
    const uid = req.id;
    try {
        const hospitalDB = await HospitalModel.findById(id);

        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: "No existe un hospital por ese id"
            })
        }

        //actualizar desde la BD
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        console.log("loque me trae", req.body)
        const hospitalActualizado = await HospitalModel.findByIdAndUpdate(id, cambiosHospital, { new: true });
        res.json({

            ok: true,
            hospital: hospitalActualizado
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const deleteHospitales = async(req, res = response) => {
    //obteniedo el id
    const id = req.params.id;

    try {
        const hospitalDB = await HospitalModel.findById(id);
        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: "No existe un hospital por ese id"
            })
        }

        await HospitalModel.findByIdAndDelete(id);

        return res.status(200).json({
            ok: true,
            msg: "Hospital Eliminado"

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