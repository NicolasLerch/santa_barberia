module.exports = function(req, res, next) {
  // Verificar si el usuario está autenticado y si el token de acceso está presente
  if (!req.session.user) {
    return res.status(401).send("No autorizado. Por favor, inicie sesión.");
  }
  // Si el usuario está autenticado, continuar con la siguiente función del middleware
  next();
};