const db = require('../../db/dbConnection');

exports.getReceivedMessages = userId => {
    return db.query('SELECT * FROM messages where "receiverId" = $1', [userId])
}

exports.getSentMessages = userId => {
    return db.query('SELECT * FROM messages where "senderId" = $1', [userId])
}

exports.deleteMessage = async (messageId, userId) => {
    const [row] = await db.query(`SELECT * from messages where id = $1`, [messageId])
    if(row.senderId === userId) {
        await db.query(`UPDATE messages SET "senderDeleted" = true where id = $1`, [messageId])
    } else if(row.receiverId === userId){
        await db.query(`UPDATE messages SET "receiverDeleted" = true where id = $1`, [messageId])
    } else {
        throw new Error('No user exists with this id');
    }
}
