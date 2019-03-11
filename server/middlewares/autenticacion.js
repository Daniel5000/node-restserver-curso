const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');



//======================
//Verificacion token
//======================


let verificaToken = (req, res, next) => {

    let token = req.get('token');


    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};


//=========================
//Verifica AdminRol 
//=========================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    let body = req.body;

    // let usuario = new Usuario({
    //     nombre: body.nombre,
    //     email: body.email,
    //     role: body.role
    // });

    console.log(usuario);


    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {
        res.json({
            ok: false,
            err: {
                message: 'El usuario nbo es administrador'
            }
        });
    }
}



//======================
//Verificacion token para imagen
//======================
let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

}


module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}