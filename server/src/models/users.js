const db = require('../../db/dbConnection');

exports.add = async ({ firstName, lastName, password, email }) => {
    const exists = await exports.getUserByEmail(email)
    if (exists) throw new Error('user already exists in the databse')
    const queryRes = await db.query(`insert into users ("firstName", "lastName", "password", "email") VALUES ($1, $2, $3, $4) returning *`,
        [firstName, lastName, password, email])

    return queryRes;
}

exports.edit = async ({ id, firstName, lastName }) => {
    const queryRes = await db.query(
            `UPDATE users
    SET "firstName" = $2,
    "lastName" = $3
    WHERE id = $1 returning *` , [id, firstName, lastName])
    return queryRes;
}

exports.getUserByEmail = async (email) => {
   const queryRes = await db.query(`SELECT * FROM users where email = $1`, [email])
   return queryRes.length? queryRes[0] : null
};

exports.getUserById = async (id) => {
    const [queryRes] = await db.query('SELECT * from users where id = $1', [id])
    return queryRes
}