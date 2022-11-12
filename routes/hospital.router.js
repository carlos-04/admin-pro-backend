/**
 * 
 *Ruta:api/hospital
 *req:Solicitud
 *res:Respuesta
 */
const { Router } = require('express');
const { body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { getHospitales, createHospitales, updateHospitales, deleteHospitales } = require('../controllers/hospital.controller')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get('/', validarJWT, getHospitales);
router.post('/', [validarJWT,
    body('nombre', 'el nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], createHospitales);
router.put('/:id', [], updateHospitales);
router.delete('/:id', deleteHospitales);


module.exports = router