//======================
//Puerto
//======================

process.env.PORT = process.env.PORT || 3000;

//======================
//Entorno
//======================


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================
//Base de datos
//======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://cafe-usuario:Orion2695147@ds161295.mlab.com:61295/cafe123';
}

process.env.URLDB = urlDB;