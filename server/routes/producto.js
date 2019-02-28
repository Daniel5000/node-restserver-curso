const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');


//================================
//Otener Productos
//================================
app.get('/productos', verificaToken, (req, res) => {
    //trae todos los productos
    //populate : usuario categoria
    //paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);


    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productosDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos: productosDB
            });
        });


});

//================================
//Otener un producto por ID
//================================
app.get('/productos/:id', verificaToken, (req, res) => {
    //trae todos los productos
    //populate : usuario categoria
    //paginado
    let id = req.params.id;


    Producto.findById(id)
        .populate('usuario', 'nombre mail')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            if (!productoDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }



            return res.json({
                ok: true,
                producto: productoDB
            });
        })
});

//================================
//Buscar Productos
//================================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;


    let regex = new RegExp(termino, 'i');


    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            return res.json({
                ok: true,
                productos
            });
        });
});




//================================
//Crear un nuevo producto por ID
//================================
app.post('/productos', verificaToken, (req, res) => {
    //grabar un usuario
    //grabar una categoria del listado


    let body = req.body

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: true,
        categoria: body.categoria

    });


    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            producto: productoDB
        });



    });


});


//================================
//Actualzar un producto
//================================
app.put('/productos/:id', verificaToken, (req, res) => {
    //grabar un usuario
    //grabar una categoria del listado

    let id = req.params.id;
    let body = req.body;


    //Esta es una manera de hacerlo

    // Producto.findByIdAndUpdate(id, descProducto, { new: true, runValidators: true }, (err, productoBD) => {
    //     if (err) {
    //         return res.status(500).json({
    //             ok: false,
    //             err
    //         });
    //     }


    //     if (!productoBD) {
    //         return res.status(500).json({
    //             ok: false,
    //             err: {
    //                 message: 'El ID no existe'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         producto: productoBD
    //     });
    // });


    //la forma en la que esta echa en el curso

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El Id no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;


        productoDB.save((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        });

    })



});


//================================
//Borrar un producto
//================================
app.delete('/productos/:id', verificaToken, (req, res) => {
    //grabar un usuario
    //grabar una categoria del listado
    //disponible a false
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoDBBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoDBBorrado,
                message: 'Producto Borrado'
            })
        })



    })
});




module.exports = app;