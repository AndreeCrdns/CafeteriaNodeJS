const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const port = 1000;

// Configuración de la conexión a la primera base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cafeteria'
});

// Configuración de la conexión a la segunda base de datos
const connection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cafeteria2'
});

// Conectar a la primera base de datos
connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
});

// Conectar a la segunda base de datos
connection2.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta para agregar un producto a la tabla
// Manejar solicitud GET para agregar un producto a la tabla
app.get('/agregar_tabla/:id', (req, res) => {
    const idProducto = req.params.id;

    connection.query('SELECT * FROM productos WHERE id_producto = ?', [idProducto], (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            return res.status(500).send('Error en la consulta');
        }

        if (results.length > 0) {
            const producto = results[0];
            res.render('agregar_tabla', { producto });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    });
});

// Manejar solicitud POST para agregar un producto a la tabla
app.post('/agregar_tabla/:id', (req, res) => {
    const { nombre_producto, descripcion, precio, imagen } = req.body;
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const hora = fecha.getHours();
    const min = fecha.getMinutes();
    const seg = fecha.getSeconds();
    const formatoFecha = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')} ${hora.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;

    const insertQuery = 'INSERT INTO productosRest (nombre_producto, descripcion, precio, imagen, fecha) VALUES (?, ?, ?, ?, ?)';
    connection2.query(insertQuery, [nombre_producto, descripcion, precio, imagen, formatoFecha], (error, results) => {
        if (error) {
            console.error('Error al insertar en la tabla:', error);
            return res.status(500).send('Error al insertar en la tabla');
        }
        res.render('producto_agregado');
    });
});


// Ruta para mostrar la tabla (puedes adaptarla según tu necesidad)
app.get('/', (req, res) => {
    res.render('producto_agregado');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port} REST`);
});
