const fs = require('fs');

function getCredentials() {
  const content = fs.readFileSync('client_secret.json', 'utf8');
  const key = JSON.parse(content).installed;
  return {
    clientId: key.client_id,
    clientSecret: key.client_secret,
    redirectUri: key.redirect_uris[1] // Usamos la segunda URL en la lista, que corresponde a /oauth2callback
  };
}

module.exports = { getCredentials };