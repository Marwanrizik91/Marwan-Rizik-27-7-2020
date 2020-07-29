const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');
const users = require('./users')
const messages = require('./messages')


// User routes
router.post('/api/user/edit', middlewares.editUserValidation, users.edit)

// Signup route
router.post('/api/user/signup', middlewares.addUserValidation, users.addUser)


// login & logout routes
router.post('/api/user/login', users.login)
router.delete('/api/user/logout', users.logout)

// messages routes
router.get('/api/messages/received', middlewares.authCheck, messages.getReceivedMessages)
router.get('/api/messages/sent', middlewares.authCheck, messages.getSentMessages)
router.get('/api/message/:id', middlewares.authCheck, messages.getOneMessage)
router.post('/api/messages', middlewares.authCheck, middlewares.messageValidation, messages.addMessage)
router.post('/api/message/delete/:id', middlewares.authCheck, messages.deleteMessage)
router.post('/api/message/read/:id', middlewares.authCheck, messages.markAsRead)


module.exports = router;