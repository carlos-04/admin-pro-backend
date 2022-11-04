/**
 * 
 *Ruta:api/usuarios
 * 
 */
//importaciones
const { Router } = require('express');
const { body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { getUsers, createUsers, updateUser, deleteUser } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();
//obtener usuarios
router.get('/', validarJWT, getUsers);
//crear usuarios
router.post('/', [
            //con este check lo que le estoy diciendo es que el campo no puede estar vacio
            body('nombre', 'el nombre es obligatorio').not().isEmpty(),
            body('password', 'la contraseña es obligatoria').not().isEmpty(),
            body('email', 'el email es obligatorio').isEmail(),
            validarCampos
        ],
        createUsers)
    //actualizar usuarios
router.put('/:id', validarJWT, [
        body('nombre', 'el nombre es obligatorio').not().isEmpty(),
        body('email', 'el email es obligatorio').isEmail(),
        body('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateUser);

//borrar usuarios
router.delete('/:id', validarJWT, deleteUser);

module.exports = router;