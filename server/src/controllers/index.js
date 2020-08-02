const express = require('express');
const router = express.Router();
const {authCheck, messageValidation, addUserValidation, editUserValidation} = require('../middlewares');
const users = require('./users')
const messages = require('./messages')


// User routes
router.post('/api/user/edit', editUserValidation, authCheck, users.edit)

// Signup route
router.post('/api/user/signup', addUserValidation, users.addUser)


// login & logout routes
router.post('/api/user/login', users.login)
router.get('/api/user/check', users.check)
router.delete('/api/user/logout', users.logout)

// messages routes
router.get('/api/messages/received', authCheck, messages.getReceivedMessages)
router.get('/api/messages/sent', authCheck, messages.getSentMessages)
router.get('/api/message/:id', authCheck, messages.getOneMessage)
router.post('/api/messages', authCheck, messageValidation, messages.addMessage)
router.post('/api/message/delete/:id', authCheck, messages.deleteMessage)
router.post('/api/message/read/:id', authCheck, messages.markAsRead)


module.exports = router;