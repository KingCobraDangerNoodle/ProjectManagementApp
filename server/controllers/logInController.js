const People = require('../models/people.js');

const logInController = {
  async login(req, res, next) {
    console.log('in login middleware');
    let result = await People.find({ ...req.body });
    if (result.length === 0) {
      res.status(400).send('Username or password is incorrect');
    } else {
      res.locals.people = result;
      next();
    }
  },

  async signup(req, res, next) {
    console.log('in signup middleware');
    const data = await People.create({ ...req.body });
    console.log(data);
    next();
  },

  async isUnique(req, res, next) {
    console.log('in isUnique middleware');

    const result = await People.findOne({
      username: req.body.username
    });
    if (result === null) {
      next();
    } else {
      res.status(400).send('Username already exists');
    }
  }
};

module.exports = logInController;
