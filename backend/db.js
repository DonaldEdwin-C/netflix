const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '@Kali0577',
  database: 'movie_app',
  port: 3333
})

module.exports = pool
