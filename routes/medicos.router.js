/**
 * 
 *Ruta:api/hospital
 *req:Solicitud
 *res:Respuesta
 */
const { Router } = require('express');
const { body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { getMedicos, createMedicos, updateMedicos, deleteMedicos } = require('../controllers/medico.controller')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get('/', validarJWT, getMedicos);
router.post('/', [
    validarJWT,
    body('nombre', 'el nombre del medico es necesario').not().isEmpty(),
    body('hospital', 'el id del hospital debe de ser valido.').isMongoId(),
    validarCampos
], createMedicos);
router.put('/:id', [
    validarJWT,
    validarCampos
], updateMedicos);
router.delete('/:id', deleteMedicos);


module.exports = router