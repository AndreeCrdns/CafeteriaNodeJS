
const express = require('express');
const control = require('../controller/control');
const controlTicket = require('../controller/controlticket');
const controlUsuarios = require('../controller/controlUsuarios');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'images/' });


router.get('/listar', control.listar);
router.post('/listar', control.listar)
router.get('/agregar', control.agregar);
router.post('/agregar', upload.single('imagen'), control.guardar);
router.post('/eliminar', control.eliminar);
router.get('/editar/:id', control.editar);
router.post('/editar/:id', upload.single('imagen'), control.actualizar);
router.get('/almacen', control.listarAlmacen);
router.get('/agregarAlmacen', control.agregarAlmacen);
router.post('/agregarAlmacen', control.guardarAlmacen);
router.post('/eliminarAlmacen', control.eliminarAlmacen);
router.get('/editarAlmacen/:id', control.editarAlmacen);
router.post('/editarAlmacen/:id', control.actualizarAlmacen);
router.get('/ticket', controlTicket.ticket);
router.get('/agregar_pedido/:id', controlTicket.agregar_pedido);
router.post('/agregar_pedido/:id', controlTicket.guardar_pedido);
router.post('/finalizar_compra', controlTicket.finalizar_compra);
router.get('/registrar', controlUsuarios.registrar);
router.post('/registrar', controlUsuarios.guardarUsuario);
router.post('/eliminarPedido', controlTicket.eliminarPedido);

module.exports = router;