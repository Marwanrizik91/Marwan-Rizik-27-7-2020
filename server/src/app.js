const express = require('express');
const controllers = require('./controllers')
const cookieParser = require('cookie-parser')


require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(controllers)

module.exports = app;
