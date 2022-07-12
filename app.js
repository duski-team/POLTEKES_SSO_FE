if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path');

// const router = require('./routes/index')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


module.exports = app