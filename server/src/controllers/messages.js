const messages = require('../modules/messages');
const users = require('../modules/users');

exports.getOneMessage = (req, res) => {
    const messageId = req.params.id
    const userId = res.locals.user

    messages.getMessageById(userId, messageId).then((message) => {
        message.length < 1 ? res.status(200).json({ message: 'You have 0 messages' }) :
        res.status(200).json({ message, code: 200 })
    }).catch(err => {
        console.error(err)
        res.status(500).json({ error: err.message })
    })
}

exports.getReceivedMessages = (req, res) => {
    const userId = res.locals.user
    messages.getReceivedMessages(userId).then((messages) => {
        res.status(200).json({ messages, code: 200 })
    }).catch(e => {
        console.error(e)
        res.status(500).json({ message: e.message })
    })
}

exports.getSentMessages = (req, res) => {
    const userId = res.locals.user
    messages.getSentMessages(userId).then((messages) => {
        res.status(200).json({ messages, code: 200 })
    }).catch(e => {
        console.error(e)
        res.status(500).json({ message: e.message })
    })
}

exports.addMessage = async (req, res) => {


    // get the receiver in order to add his id to the message
    const [receiver] = await users.getUserByEmail(req.body.email)

    const message = {
        //gets the sender id from the locals(added when authed)
        senderId: res.locals.user,
        receiverId: receiver.id,
        title: req.body.title,
        content: req.body.content
    }

    messages.addMessage(message).then((data) => {
        res.status(200).json({ code: 200, data, message: 'message added successfully' })
    }).catch(e => {
        console.error(e)
        res.status(500).json({ error: e.message })
    })


}

exports.deleteMessage = (req, res) => {
    const messageId = req.params.id
    const userId = res.locals.user

    messages.deleteMessage(messageId, userId).then((data) => {
        res.status(200).json({ message: 'Deleted successfully' })
    }).catch(e => {
        console.error(e)
        res.status(500).json({ error: e.message })
    })
}

exports.markAsRead = (req, res) => {
    const messageId = req.params.id
    messages.markAsRead(messageId).then((data) => {
        res.status(200).json({ data, message: 'Mark as read successfully' })
    }).catch(e => {
        console.error(e)
        res.status(500).json({ error: e.message })
    })
}