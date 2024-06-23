// controllers/sheetsController.js
const { google } = require('googleapis');
const { oauth2Client } = require('./sheetsAuthController');

function addForm(req, res){
    res.render('Home');
}

async function appendValues(req, res) {
  if (!req.session.tokens) {
    res.send('Debes loguarte para adquirir permiso')
    return;
  }

  oauth2Client.setCredentials(req.session.tokens);

  let nombre = req.body.name;
  let apellido = req.body.lastName;
  let service = req.body.service;
  let price = parseInt(req.body.price);
  let consumption = req.body.consumption;

  // Obtener la fecha actual
  let today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const date = `${day}/${month}/${year}`;
  

  const spreadsheetId = "1-XqaFxYmyB_9HdJ9oL0l_5wu5bkqtAsAuA3cvybmpOQ";
  const range = "barberia!A3:F3";
  const valueInputOption = "RAW";
  const _values = [[date, nombre, apellido, service, consumption, price]];
  
  try {
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
    const resource = {
      values: _values,
    };
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    console.log(`${result.data.updates.updatedCells} cells appended.`);
    res.send('Values added to the spreadsheet!');
  } catch (error) {
    res.status(500).send('Failed to add values: ' + error.message);
  }
}

module.exports = { appendValues, addForm };
