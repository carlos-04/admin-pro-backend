const { Schema, model } = require('mongoose');


//creando mi modelo de Hospitales
const HospitalSchema = Schema({
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
        }

    }, { collection: 'Hospitales' }) //en esta linea estoy marcando como quiero que se llame esta tabla en mi base de datos.

//esta configuracion es para fines visuales,
//no afecta la base de datos
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema);