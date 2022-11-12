const { Schema, model } = require('mongoose');


//creando mi modelo de medicos
const MedicoSchema = Schema({
        nombre: {
            type: String,
            required: true
        },
        img: {
            type: String,
        },
        //haciendo referencia al usuario
        usuario: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        //haciendo referencia al usuario
        hospital: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Hospital'
        }

    }) //en esta linea estoy marcando como quiero que se llame esta tabla en mi base de datos.

//esta configuracion es para fines visuales,
//no afecta la base de datos
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Medicos', MedicoSchema);