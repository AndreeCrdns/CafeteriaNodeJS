function ticket(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT dp.id_detalles, dp.id_producto, p.nombre_producto, dp.t_leche,dp.shot, p.precio, p.imagen FROM detalles_pedido dp JOIN productos p ON dp.id_producto = p.id_producto', (err, detalles_pedido) => {
            if (err) {
                res.json(err);
            }
            res.render('productos/ticket', { detalles_pedido });
        })
    });
};


function agregar_pedido(req, res) {
    const idproducto = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos WHERE id_producto = ?', [idproducto], (err, productos) => {
            if (err) {
                res.json(err);
            }
            res.render('productos/agregar_pedido', { productos });
        })
    });
};

function guardar_pedido(req, res) {
    const datos = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO detalles_pedido SET ?', [datos], (err, rows) => {
            res.redirect('/listar');
        })
    });
};

function finalizar_compra(req, res) {
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM detalles_pedido', (err, rows) => {
            res.redirect('/listar');
        })
    });
};

function eliminarPedido(req, res) {
    const datos = req.body.id;
    
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM detalles_pedido WHERE id_detalles = ?',[datos], (err, rows) => {
            res.redirect('/ticket');
        })
    });
};


module.exports ={
    ticket: ticket,
    agregar_pedido: agregar_pedido,
    guardar_pedido: guardar_pedido,
    finalizar_compra: finalizar_compra,
    eliminarPedido: eliminarPedido
}