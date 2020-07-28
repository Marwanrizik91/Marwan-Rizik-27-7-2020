const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');
const users = require('./users')
const messages = require('./messages')


// Signup route
router.post('/api/signup', users.addUser)


// login & logout routes
router.post('/api/login', users.login)
router.delete('/api/logout', users.logout)

module.exports = router;