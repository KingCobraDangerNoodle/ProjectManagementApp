const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});
pool.connect();

//module.exports.login = (args) =>{
// pool.query
// }

module.exports = {
  login: async (user) => {
    const { username, password } = user;
    const findUserQuery = {
      text: `SELECT name, id FROM users WHERE username = $1 AND password = $2`,
      values: [username, password],
    };
    try {
      const result = await pool.query(findUserQuery); 
    //   return result.rows[0];
      console.log(result.rows[0])
    } catch (err) {
      return err;
    }
  },
};
