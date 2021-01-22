const { Pool } = require('pg');

const PG_URI = 'postgresql://postgres:password@localhost:5432/scription';
// Schema for this database can be found at ./public/assets/postgresql-schema.jpg

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};