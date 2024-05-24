function verificarRol(rolPermitido) {
  return function (req, res, next) {
    if (req.user && req.user.rol === rolPermitido) {
      next();
    } else {
      res.status(403).send('No tienes permiso para acceder a esta página.');
    }
  }
}

function registrar(req, res) {
  res.render('usuarios/registrar')
}

async function guardarUsuario(req, res) {
  const nombre = req.body.username;
  const contra = req.body.password;
  const rol = req.body.t_usuario;
  req.getConnection((err, conn) => {
    conn.query('INSERT INTO usuario SET ?', { username: nombre, password: contra, t_usuario: rol, }, async (error, results) => {
      res.redirect('/listar');
    })
  });
}




module.exports = {
  verificarRol: verificarRol,
  registrar: registrar,
  guardarUsuario: guardarUsuario
}