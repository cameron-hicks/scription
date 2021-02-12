const { Pool } = require('pg');
const { PG_URI } = require('./secrets.js');

const pool = new Pool({
  connectionString: PG_URI,
  max: 20     // # of concurrent connections allowed 
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('Executing query ', text);
    return pool.query(text, params, callback);
  },
}