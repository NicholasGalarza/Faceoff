'use strict'

const express = require('express');
const path = require('path');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 8080;

var publicPath = path.resolve(__dirname, '..');

app.use(express.static(publicPath));

app.use('/', (req, res, send) => {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'))
})

app.listen(port, function () {
 console.log('Virtual/Augmented Reality Enabled On Port' + port);
});