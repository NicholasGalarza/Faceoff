'use strict'
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8080

let publicPath = path.resolve(__dirname, '..', 'public')

app.use(express.static(publicPath))

app.use('/', (req, res, send) => {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'))
})

app.listen(PORT, () => {
 console.log(`Virtual Reality Enabled On Port ${PORT}`)
});