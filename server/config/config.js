//======================
//Puerto
//======================

process.env.PORT = process.env.PORT || 3000;

//======================
//Entorno
//======================


//======================
//Vencimiento del token
//======================
//60 segundos
//60 minutos 
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30 * 24;


//======================
//SEED semilla de autenticacion
//======================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';








process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================
//Base de datos
//======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;




//======================
//Google Client ID
//======================
''
process.env.CLIENT_ID = process.env.CLIENT_ID || '202960789101-frqek1nlks5f7eutbq904r3slhdgsham.apps.googleusercontent.com';