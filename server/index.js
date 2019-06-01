const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');

console.log('init')
app.use(bodyParser.json());
app.use(cors());
const api = require('./routes/api.js');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use('/api', api);

module.exports = app;
