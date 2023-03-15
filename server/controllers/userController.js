const User = require('../models/user.js');

const userController = {
  async login(req, res, next) {
    console.log('in login middleware');
    let result = await User.find({ ...req.body });
    if (result.length === 0) {
      res.status(400).send('Username or password is incorrect');
    } else {
      res.locals.user = result;
      next();
    }
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
      username: req.body.username
    });
    if (result === null) {
      next();
    } else {
      res.status(400).send('Username already exists');
    }
  }
};

module.exports = userController;
