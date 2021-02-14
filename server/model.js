const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.PG_URI,
  max: 3     // # of concurrent connections allowed per client
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('Executing query ', text);
    return pool.query(text, params, callback);
  },
}