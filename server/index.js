'use strict'
const express = require('express');
const path = require('path');
const app = express();

const production = process.env.NODE_ENV === 'production';
const port = production ? process.env.PORT : 8080;
console.log('my port', port)
var publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

app.use('/', (req, res, send) => {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'))
})

app.listen(port, () => {
 console.log(`Virtual Reality Enabled On Port ${port}`);
});