
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});
pool.connect();

module.exports = {
  login: async (user) => {
    const { username, password } = user;
    const findUserQuery = {
      text: `SELECT username, id FROM users WHERE username = $1 AND password = $2`,
      values: [username, password],
    };
    try {
      const result = await pool.query(findUserQuery);
      return result.rows;
    } catch (err) {
      return err;
    }
  },
  saveList: async (list) => {
    //insert the list into the list table
    const saveListEntryQuery = {
      text: `INSERT INTO lists (title,users_id) VALUES ($1,$2) RETURNING "id"`,
      values: [list.title, list.userId],
    };
    let listPrimaryKey;
    try {
      const listQueryResult = await pool.query(saveListEntryQuery);
      listPrimaryKey = listQueryResult.rows[0].id;
    }
    catch (err) {
      console.log("ERROR OCCURED");
      return err;
    }

    const saveTaskEntryQuery = {
      text: `INSERT INTO tasks (description, lists_id) VALUES ($1,$2)`,
    };

    //referencing the list foreign key iterate over tasks inserting each into task table
    for (const task of list.tasks) {
      try {
        saveTaskEntryQuery.values = [task, listPrimaryKey];
        await pool.query(saveTaskEntryQuery);
      }
      catch (err) {
        return err;
      }
    }
    list.listId = listPrimaryKey; //update listId on list object
    return list;
  },

  deleteList: async (listId) => {
    const deleteListEntryQuery = {
      text: `DELETE FROM lists WHERE id = $1 RETURNING "title"`,
      values: [listId],
    };
    try {
      let result = await pool.query(deleteListEntryQuery)
      console.log(result.rows[0])
    }
    catch (err){
      return err
    }
  }

};
