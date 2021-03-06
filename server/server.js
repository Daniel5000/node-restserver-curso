require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../server/public')));
console.log(path.resolve(__dirname, '../server/public'));
//COnfiguracion Global de rutas
app.use(require('./routes/index'));
// app.use(require('./routes/login'));

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto 3000");
});