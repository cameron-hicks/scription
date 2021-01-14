const { Pool } = require('pg');

const PG_URI = 'postgresql://postgres:password@localhost:5432/scription';   // syntax: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// Schema for this database can be found at ./public/assets/postgresql-schema.jpg

module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};