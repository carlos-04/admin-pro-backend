/**
 * 
 *Ruta:api/auth
 *req:Solicitud
 *res:Respuesta
 */
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')
const { getTodo, getDocumentColeccion } = require('../controllers/busqueda.controller');

const router = Router();

router.get('/:busqueda', validarJWT, getTodo)
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentColeccion);


module.exports = router