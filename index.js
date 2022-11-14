//importaciones en express
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');
//creando el servidor de express
const app = express();

//Configurar cors
app.use(cors());

//carpeta publica 
app.use(express.static('public'));
//middleware lectura y parseo del body
//los middleware son funciones que se ejecutan antes de llegar de otra
app.use(express.json());

//base de datos
dbConnection();

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospital', require('./routes/hospital.router'));
app.use('/api/medicos', require('./routes/medicos.router'));
app.use('/api/todo', require('./routes/busqueda.router'));
app.use('/api/upload', require('./routes/upload.router'));
// app.get('/', (req, res) => {
//     res.json({
//         ok: true,
//         msg: 'Hola Mundo'

//     })
// })

//para correr el servidor de express
app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.PORT);
})