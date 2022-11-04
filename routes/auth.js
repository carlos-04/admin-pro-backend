/**
 * 
 *Ruta:api/auth
 *req:Solicitud
 *res:Respuesta
 */
const { Router } = require('express');
const { body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/', [
        body('password', 'la contraseña es obligatoria').not().isEmpty(),
        body('email', 'el email es obligatorio').isEmail(),
        validarCampos
    ],
    login)


module.exports = router