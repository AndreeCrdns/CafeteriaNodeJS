const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 2000;

// Configuración de la conexión a la primera base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cafeteria2'
});

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
});

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para manejar datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    connection.query('SELECT * FROM productosRest', (err, productos) => {
        if (err) {
            res.json(err);
        }
        res.render('tabla', { productos });
    })
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port} MS`);
});