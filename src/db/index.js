import mysql from 'mysql2';

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  database: 'toss',
  user: 'root',
  password: 'zw15079237786'
})

export default pool.promise();