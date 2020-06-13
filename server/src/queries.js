const Pool = require('pg').Pool
const pool = new Pool({
    user: 'zhilong',
    host: 'postgres',
    password: 'password',
    database: 'test_sport',
    port: 5432,
})

const getUsers = (request, response) => {
    console.log("Call to get users!")
    pool.query('SELECT * FROM players ORDER BY firstname ASC', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.send(results)
    })
}
module.exports = {
    getUsers
}