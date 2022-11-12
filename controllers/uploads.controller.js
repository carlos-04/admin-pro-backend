const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const fileUpload = (req, res = response) => {
    const { actualizarImagen } = require('../helpers/actualizar-imagen')
    const tipo = req.params.tipo;
    const id = req.params.id;
    //estos son los endpoint que me tienen que funcionar
    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {

        res.status(400).json({
            ok: false,
            msg: "No es un medico, hospital o usuario (Tipo)"
        })

    }
    //validar que exista el archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //procesar la imagen
    //extrayendo la informacion de la imagen
    const file = req.files.images;
    const nombreCortado = file.name.split('.') //cortar lo que esta despues del punto
        //obteniendo la extension del archivo
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar los tipos de archivos o imagenes permitidas
    const extensionesPermitidas = ['jpg', 'png', 'jpge', 'gif']
    if (!extensionesPermitidas.includes(extensionArchivo)) {
        res.status(400).json({
            ok: false,
            msg: "No es un archivo permitido"
        })
    }
    //generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen
    path = `./uploads/${tipo}/${nombreArchivo}`;
    // Lugar en donde almacenare mi imagen
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: "Error al almacenar la imagen"
            })
        }

        //actualizar base de datos
        actualizarImagen(tipo, id, path, nombreArchivo);
        res.json({
            ok: true,
            msg: "Archivo subido",
            nombreArchivo
        })
    });

}

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);



    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpeg`);
        res.sendFile(pathImg);

    }
}





module.exports = {
    fileUpload,
    retornaImagen
}