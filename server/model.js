const { Pool } = require('pg');

let connectionString = '';
let ssl = null;

if (process.env.NODE_ENV === 'test') {
  // make .env available to this file when not using node start script
  require('dotenv').config();
  connectionString = process.env.TEST_DB;
} 
else if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.TEST_DB;
}
// production environment
else {
  connectionString = process.env.DATABASE_URL;
  // permit connections btw server and db in Heroku env
  ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool({
  connectionString,
  max: 3,     
  idleTimeoutMillis: 1000, 
  connectionTimeoutMillis: 1000,
  ssl,
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('Executing query ', text);
    return pool.query(text, params, callback);
  },
}