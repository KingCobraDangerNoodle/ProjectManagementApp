// const User = require('../models/user.js');
const db = require('../db');
const User = require('../models/user');

const userController = {
  async login(req, res, next) {
    console.log('in login middleware');
    const { username, password } = req.body;
    let user = new User(username, password);
    let dbresult = await db.login(user);
    // console.log(dbresult);
    if (dbresult.length === 0) {
      res.locals.user = 'Username or password is incorrect.';
    } else {
      user.password = null;
      res.locals.user = dbresult[0];
    }
    return next();
  },

  async signup(req, res, next) {
    console.log('in signup middleware');
    const data = await User.create({ ...req.body });
    console.log(data);
    next();
  },

  async isUnique(req, res, next) {
    console.log('in isUnique middleware');

    const result = await User.findOne({
      username: req.body.username,
    });
    if (result === null) {
      next();
    } else {
      res.status(400).send('Username already exists');
    }
  },
};

module.exports = userController;
