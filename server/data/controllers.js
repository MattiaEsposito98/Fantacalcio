const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0123456789',
  database: 'db_fantacalcio'
})

connection.connect((err) => {
  if (err) throw err
  console.log('Connected to MySQL')
})

module.exports = connection