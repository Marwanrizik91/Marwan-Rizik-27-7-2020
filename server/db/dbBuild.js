const db = require('./dbConnection');
const fs = require('fs');
const path = require('path');


const sqlPath = path.join(__dirname, 'dbBuild.sql');
const sql = fs.readFileSync(sqlPath).toString();



const runDbBuild = () =>  db.query(sql)

module.exports = runDbBuild