const db = require('../../db/dbConnection');

exports.addMessage = ({senderId, receiverId, title, content}) => {
    return db.query('insert into messages ("senderId", "receiverId", title, content) values ($1, $2, $3, $4)',
     [senderId, receiverId, title, content])
}

exports.getMessageById = async (userId, messageId) => {
    const [queryRes] = await db.query('SELECT * from messages where id = $1', [messageId])
    if((queryRes.senderId === +userId || queryRes.receiverId === +userId)) {
        return queryRes
    } else {
        throw new Error('No message found')
    }
}

exports.getReceivedMessages = userId => 
     db.query('SELECT * FROM messages where "receiverId" = $1', [userId])


exports.getSentMessages = userId => 
     db.query('SELECT * FROM messages where "senderId" = $1', [userId])


exports.deleteMessage = async (messageId, userId) => {
    const [queryRes] = await db.query(`SELECT * from messages where id = $1`, [messageId])
    if(queryRes.senderId === +userId) {
        await db.query(`UPDATE messages SET "senderDeleted" = true where id = $1 returning *`, [messageId])
    } else if(queryRes.receiverId === +userId){
        await db.query(`UPDATE messages SET "receiverDeleted" = true where id = $1 returning *`, [messageId])
    } else {
        throw new Error('No user exists with this id');
    }
}

exports.markAsRead =  messageId => db.query('UPDATE messages SET "isRead" = true where id = $1 returning *', [messageId])


