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

const updateMedicos = async(req, res = response) => {
    //obteniedo el id
    const id = req.params.id;
    //obteniendo el id del usuario
    const uid = req.id;

    try {
        const medicoDB = await MedicosModel.findById(id);

        if (!medicoDB) {
            res.status(404).json({
                ok: false,
                msg: "No existe un medico por ese id"
            })
        }


        //actualizar desde la BD
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await MedicosModel.findByIdAndUpdate(id, cambiosMedico, { new: true })
        return res.status(200).json({
            ok: true,
            msg: "Medico  Actualizado",
            medicoActualizado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const deleteMedicos = async(req, res = response) => {
    const id = req.params.id;
    try {

        const medicoDB = await MedicosModel.findById(id);
        if (!medicoDB) {
            res.status(404).json({
                ok: false,
                msg: "No existe un medico por ese id"
            })
        }

        await MedicosModel.findByIdAndDelete(id);

        return res.status(200).json({
            ok: true,
            msg: "Medico eliminado"
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