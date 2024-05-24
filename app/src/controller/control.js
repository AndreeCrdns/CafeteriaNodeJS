function listar(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos', (err, productos) => {
            if (err) {
                res.json(err);
            }
            res.render('productos/listar', { productos });
        })
    });
}

function agregar(req, res) {
    res.render('productos/agregar');
}

const fs = require('fs');

function saveImage(file) {
    const newPath = '/images/' + file.originalname;
    fs.renameSync(file.path, newPath);
    return newPath;
}

function guardar(req, res) {
    const imagenPath = saveImage(req.file);
    const datos = req.body;
    datos.imagen = imagenPath;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO productos SET ?', [datos], (err, rows) => {
            res.redirect('/listar');
        });
    });
}

function eliminar(req, res) {
    const idproducto = req.body.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM productos WHERE id_producto = ?', [idproducto], (err, rows) => {
            res.redirect('/listar');
        })
    })
}

function editar(req, res) {
    const idproducto = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos WHERE id_producto = ?', [idproducto], (err, productos) => {
            if (err) {
                res.json(err);
            }
            res.render('productos/editar', { productos });
        })
    });
}

function actualizar(req, res) {
    const idproducto = req.params.id;
    const datos = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE productos SET ? WHERE id_producto = ?', [datos, idproducto], (err, rows) => {
            res.redirect('/listar');
        })
    })
}

function listarAlmacen(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM almacen', (err, almacen) => {
            if (err) {
                res.json(err);
            }
            res.render('almacen/almacen', { almacen });
        })
    });
}

function agregarAlmacen(req, res) {
    res.render('almacen/agregarAlmacen');
}

function guardarAlmacen(req, res) {
    const datos = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO almacen SET ?', [datos], (err, rows) => {
            res.redirect('/almacen');
        })
    });
}

function eliminarAlmacen(req, res) {
    const idalmacen = req.body.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM almacen WHERE id_almacen = ?', [idalmacen], (err, rows) => {
            res.redirect('/almacen');
        })
    })
}

function editarAlmacen(req, res) {
    const idalmacen = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM almacen WHERE id_almacen = ?', [idalmacen], (err, almacen) => {
            if (err) {
                res.json(err);
            }
            res.render('almacen/editarAlmacen', { almacen });
        })
    });
}

function actualizarAlmacen(req, res) {
    const idalmacen = req.params.id;
    const datos = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE almacen SET ? WHERE id_almacen = ?', [datos, idalmacen], (err, rows) => {
            res.redirect('/almacen');
        })
    })
}


module.exports = {
    listar: listar,
    agregar: agregar,
    eliminar: eliminar,
    editar: editar,
    guardar: guardar,
    actualizar: actualizar,
    listarAlmacen: listarAlmacen,
    guardarAlmacen: guardarAlmacen,
    agregarAlmacen: agregarAlmacen,
    eliminarAlmacen: eliminarAlmacen,
    editarAlmacen: editarAlmacen,
    actualizarAlmacen: actualizarAlmacen,
}
