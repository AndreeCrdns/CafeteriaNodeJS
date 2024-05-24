const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mysql = require('mysql');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cafeteria'
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());

app.get('/', (req, res) => {
    res.render('buscar');
});

app.post('/', (req, res) => {
    const nombre = req.body.nombre;
    connection.query('SELECT * FROM productos WHERE nombre_producto = ?', [nombre], (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            return res.status(500).send('Error en la consulta');
        }
        const primerRegistro = results[0];
        const service = {
            ProductosService: {
                ProductosPort: {
                    GetProductos: function (args) {
                        return {
                            primerRegistro
                        };
                    }
                }
            }
        };
        const xml = fs.readFileSync('productos.wsdl', 'utf8');
        app.listen(15099);
        soap.listen(app, '/productos', service, xml);
        res.render('resultado', { producto: primerRegistro });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port} SOAP`);
});
