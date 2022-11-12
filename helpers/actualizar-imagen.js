const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital.model')
const Medico = require('../models/medico.model')
const fs = require('fs')


const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //Elimino la imagen vieja
        fs.unlinkSync(path)
    }
}
const actualizarImagen = async(tipo, id, path, nombreArchivo) => {
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log("No es un medico por id");
                return false;
            }
            //si el medico tiene una imagen asignada
            const pathViejoMedico = `uploads/medicos/${medico.img}`;
            borrarImagen(pathViejoMedico);
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log("No es un hospital por id");
                return false;
            }
            //si el medico tiene una imagen asignada
            const pathViejoHospital = `uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejoHospital);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log("No es un usuario por id");
                return false;
            }
            //si el medico tiene una imagen asignada

            if (usuario.img) {

                const pathViejoUsuario = `uploads/usuarios/${usuario.img}`;
                borrarImagen(pathViejoUsuario);
            }
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    }

}


module.exports = {
    actualizarImagen
}