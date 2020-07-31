const db = require('../../db/dbConnection');
const users = require('./users')

exports.addMessage = ({senderId, receiverId, senderEmail, title, content }) => {
    return db.query('insert into messages ("senderId", "receiverId", "senderEmail", title, content ) values ($1, $2, $3, $4, $5) returning *',
     [senderId, receiverId, senderEmail, title, content ])
}

exports.getMessageById = async (userId, messageId) => {
    const [queryRes] = await db.query('SELECT * from messages where id = $1', [messageId])
    if((queryRes.senderId === +userId || queryRes.receiverId === +userId)) {
        queryRes.sender = await users.getUserById(queryRes.senderId)
        queryRes.receiver = await users.getUserById(queryRes.receiverId)
        return queryRes
    } else {
        throw new Error('No message found')
    }
}

exports.getReceivedMessages = userId => db.query('SELECT * FROM messages where "receiverId" = $1 ORDER BY "creationDate" desc', [userId])


exports.getSentMessages = userId => db.query('SELECT * FROM messages where "senderId" = $1  ORDER BY "creationDate" desc', [userId])


exports.deleteMessage = async (messageId, userId) => {
    const [queryRes] = await db.query(`SELECT * from messages where id = $1`, [messageId])
    if(queryRes.senderId === +userId) {
        await db.query(`UPDATE messages SET "senderDeleted" = true where id = $1`, [messageId])
    } else if(queryRes.receiverId === +userId){
        await db.query(`UPDATE messages SET "receiverDeleted" = true where id = $1`, [messageId])
    } else {
        throw new Error('No user exists with this id');
    }
}

exports.markAsRead =  messageId => db.query('UPDATE messages SET "isRead" = true where id = $1 returning *', [messageId])


