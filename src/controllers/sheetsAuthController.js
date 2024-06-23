// controllers/authController.js
const {google} = require('googleapis');
const { getCredentials } = require('../config/credentials');

const {clientId, clientSecret, redirectUri} = getCredentials();
const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const login = (req, res) => {
  console.log(clientId, clientSecret, redirectUri)
  if (req.session.tokens) {
    res.send('You are already authenticated! <a href="/logout">Logout</a>');
  } else {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true
    });
    res.redirect(authorizationUrl);
  }
};

const oauth2callback = (req, res) => {
  const code = req.query.code;
  console.log("Ingresamos a outh2callBack");
  console.log(code)
  if (code) {
    oauth2Client.getToken(code, (err, tokens) => {
      if (err) {
        return res.status(400).json({ error: 'Error retrieving access token', details: err });
      }
      oauth2Client.setCredentials(tokens);
      req.session.tokens = tokens; // Guardar tokens en la sesión
      res.send('Exito'); // Redirigir a una página de éxito o a la página principal de la aplicación
    });
  } else {
    res.status(400).send('No code received');
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

module.exports = { login, oauth2callback, logout, oauth2Client };
