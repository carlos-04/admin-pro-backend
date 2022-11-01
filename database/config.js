const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = () => {
    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de iniciar la BD ver logs");
    }
}

module.exports = {
    dbConnection
}