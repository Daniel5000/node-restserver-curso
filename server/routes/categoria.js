const express = require('express');



let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

const Categoria = require('../models/categoria');


//================================
//Mostar todas las categorias
//================================
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                categorias
            });
        });
});


//================================
//Mostar una categoria por ID
//================================
app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;


    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El id no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


});

//================================
//Crear nueva categoria
//================================
app.post('/categoria', verificaToken, (req, res) => {
    // regresa la nueva categoria
    let body = req.body

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });


    categoria.save((err, categoriaDB) => { // se recibe un error si no sucede o una categoria de BD
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


//================================
//Actualizar una categoria
//================================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


//================================
//Borrar una categoria
//================================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    //solo 1 administrador puede borrar la categoria
    let id = req.params.id

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        console.log(categoriaDB);

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada'
        });


    });
});

module.exports = app;