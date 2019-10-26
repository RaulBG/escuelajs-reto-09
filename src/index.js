const express = require('express');
const app = express();

var bodyParser = require('body-parser');

const { config } = require('./config');
const platziStore = require('./routes')

app.use(bodyParser.json());

platziStore(app);

app.listen(config.port, err => {
  if (err) {
    console.error("Error: ", err);
    return;
  }
  console.log(`Listening http://localhost:${config.port}`);
});