const messages = require('../models/messages');
const users = require('../models/users');

exports.getOneMessage = async (req, res) => {
    const messageId = req.params.id
    const userId = res.locals.user

    try {
        const messageData = await messages.getMessageById(userId, messageId)
        res.status(200).json({ data: messageData, code: 200 })
    } catch ({ message }) {
        console.error(message)
        res.status(500).json({ error: message })
    }
}

exports.getReceivedMessages = async (req, res) => {

    const userId = res.locals.user

    try {
        const messagesData = await messages.getReceivedMessages(userId)
        res.status(200).json({ data: messagesData, code: 200 })
    } catch ({ message }) {
        console.error(message)
        res.status(500).json({ error: message })
    }
}

exports.getSentMessages = async (req, res) => {

    const userId = res.locals.user

    try {
        const messagesData = await messages.getSentMessages(userId)
        res.status(200).json({ data: messagesData, code: 200 })
    } catch ({ message }) {
        console.error(message)
        res.status(500).json({ error: message })
    }
}

exports.addMessage = async (req, res) => {


    // get the receiver in order to add his id to the message
    try {
        const receiver = await users.getUserByEmail(req.body.email)
        if (!receiver) throw new Error('user not found')

        const message = {
            //gets the sender id from the locals(added when authed)
            senderId: res.locals.user,
            receiverId: receiver.id.toString(),
            title: req.body.title,
            content: req.body.content
        }

        const data = await messages.addMessage(message)
        res.status(200).json({ code: 200, data, message: 'message added successfully' })

    } catch ({ message }) {
        res.status(500).json({ error: message })
    }




}

exports.deleteMessage = async (req, res) => {
    const messageId = req.params.id
    const userId = res.locals.user

    try {
        const data = await messages.deleteMessage(messageId, userId)
        res.status(200).json({ data, message: 'Deleted successfully', code: 200 })
    } catch ({ message }) {
        console.error(message)
        res.status(500).json({ error: message })
    }
}

exports.markAsRead = async (req, res) => {
    const messageId = req.params.id

    try {
        const data = await messages.markAsRead(messageId)
        res.status(200).json({ data, message: 'Mark as read successfully' })
    } catch ({ message }) {
        console.error(message)
        res.status(500).json({ error: message })
    }
}