const pg = require('pg');

const connectionString = 'postgresql://localhost:5432/navbar';
const pool = new pg.Pool({ connectionString });

pool
  .query(
    'CREATE TABLE results(restaurantId serial PRIMARY KEY, restaurantName VARCHAR (50) NOT NULL, restaurantCuisine VARCHAR (50) NOT NULL, location VARCHAR (355) NOT NULL);'
  )
  .then(data => console.log('Created table: ', data))
  .then(() =>
    pool.query(
      `COPY results FROM '/Users/tony/hrla28/closetable/navbar/database/data.csv' DELIMITER ',' CSV HEADER;`
    )
  )
  .then(()=>{
    pool.query(
      'CREATE EXTENSION pg_trgm;'
    )
  })
  .then(() =>
    pool.query(
      'CREATE INDEX ON results (location gin_trgm_ops);'
    )
  )
  .catch(err => console.log(err));

module.exports = pool;
