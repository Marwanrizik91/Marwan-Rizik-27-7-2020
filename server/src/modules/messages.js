const db = require('../../db/dbConnection');

exports.getReceivedMessages = userId => {
    return db.query('SELECT * FROM messages where "receiverId" = $1', [userId])
}

exports.getSentMessages = userId => {
    return db.query('SELECT * FROM messages where "senderId" = $1', [userId])
}

exports.deleteMessage = async (messageId, userId) => {
    const [queryRes] = await db.query(`SELECT * from messages where id = $1`, [messageId])
    if(queryRes.senderId === userId) {
        await db.query(`UPDATE messages SET "senderDeleted" = true where id = $1 ORDER BY "creationDate" desc`, [messageId])
    } else if(queryRes.receiverId === userId){
        await db.query(`UPDATE messages SET "receiverDeleted" = true where id = $1 ORDER BY "creationDate" desc`, [messageId])
    } else {
        throw new Error('No user exists with this id');
    }
}

exports.markAsRead =  messageId => db.query('UPDATE messages SET "isRead" = true where id = $1', [messageId])


