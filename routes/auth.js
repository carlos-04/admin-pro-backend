/**
 * 
 *Ruta:api/auth
 *req:Solicitud
 *res:Respuesta
 */
const { Router } = require('express');
const { body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');

const router = Router();

router.post('/', [
        body('password', 'la contraseña es obligatoria').not().isEmpty(),
        body('email', 'el email es obligatorio').isEmail(),
        validarCampos
    ],
    login)

router.post('/google', [
        body('token', 'El Token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn)


router.get('/renew', [
        validarJWT,
    ],
    renewToken)


module.exports = router