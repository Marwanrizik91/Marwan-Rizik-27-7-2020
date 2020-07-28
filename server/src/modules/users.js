const db = require('../../db/dbConnection');

exports.add = ({ firstName, lastName, password, email }) => db.query(`insert into users ("firstName", "lastName", "password", "email") VALUES ($1, $2, $3, $4) returning *`,
    [firstName, lastName, password, email])


exports.edit = ({ id, firstName, lastName, email }) => db.query(
    `UPDATE users
SET firstName = $2,
lastName = $3,
email = $4
WHERE id = $1` , [id, firstName, lastName, email]
);

exports.getUserByEmail = email => db.query(`SELECT * FROM users where email = $1`, email);
