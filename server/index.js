'use strict'
const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080

const app = express()

app.use(express.static(path.resolve(__dirname, '../public')))

app.use('/', (req, res, send) => {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'))
})

app.listen(port, () => {
  console.log(`Virtual Reality Enabled On Port ${port}`)
});