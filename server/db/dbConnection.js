require('dotenv').config()

const pgp = require('pg-promise')();


const prodDB = {
  connectionString: process.env.PROD_DB
};

const devDB = {
  connectionString: process.env.DEV_DB
};

const connection = process.env.NODE_ENV === 'dev' ? devDB : prodDB;


const db = pgp(connection);
module.exports = db;