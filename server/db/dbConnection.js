const pgp = require('pg-promise')();

require('dotenv').config()

const prodDB = {
  connectionString: process.env.prod_DB
};

const devDB = {
  connectionString: process.env.dev_DB
};

const connection = process.env.NODE_ENV === 'test' ? devDB : prodDB;

const db = pgp(connection);
module.exports = db;