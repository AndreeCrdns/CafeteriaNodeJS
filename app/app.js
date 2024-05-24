const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const conexion = require('express-myconnection');
const router = require('./src/routes/router');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const passportlocal = require('passport-local').Strategy;
const session = require('express-session');
const soap = require('soap');
const fs = require('fs')
app.set('port', 4000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(conexion(mysql, {
  host: 'localhost',
  user: 'root',
  password: '1234',
  port: 3306,
  database: 'cafeteria'
}, 'single'));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'cafeteria'
});


app.listen(app.get('port'), () => {
  console.log(`Servidor escuchando en http://localhost:4000 APP`);
});

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));

app.set('view engine', 'hbs');

app.use(express.static('/'));

app.use('/', router);

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser('Secreto'));

app.use(session({
  secret: 'Secreto',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportlocal(
  function (username, password, done) {
    connection.query('SELECT * FROM usuario WHERE username = ?', [username], function (err, rows) {
      if (err) { return done(err); }
      if (!rows.length) {
        return done(null, false, { message: 'Nombre de usuario incorrecto.' });
      }
      const user = rows[0];
      if (user.password !== password) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id_usuario);
});

passport.deserializeUser(function (id_usuario, done) {
  connection.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario], (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result.length > 0) {
        return done(null, result[0]);
      } else {
        return done(null, false);
      }
    }
  });
});

app.get('/', (req, res, next) => {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}, (req, res) => {
  res.render('home');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/listar',
  failureRedirect: '/login'
}))

app.get('/login', (req, res) => {
  res.render('usuarios/login', { layout: false });
})
