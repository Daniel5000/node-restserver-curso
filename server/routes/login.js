const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();


app.get('/login', (req, res) => {
    let body = req.body;


    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        console.log(usuarioDB);
        if (err) {

            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o constraseña incorrectos1'
                }
            });
        }



        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o constraseña incorrectos1'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o constraseña incorrectos2'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    });

});


module.exports = app;