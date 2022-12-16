const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'postgresPassword',
  host: 'localhost',
  port: 5432,
  database: 'buynholddb',
});

module.exports = pool;
