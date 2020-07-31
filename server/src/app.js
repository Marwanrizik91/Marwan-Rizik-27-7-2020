const express = require('express');
const controllers = require('./controllers')
const cookieParser = require('cookie-parser')
const cors = require('cors')



require('dotenv').config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))

app.use(express.json());
app.use(cookieParser())
app.use(controllers)

module.exports = app;
