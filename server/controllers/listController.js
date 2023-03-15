const List = require('../models/list.js');

const listController = {
  // this would be equivalent to show all or index
  async home(req, res, next) {
    const data = await List.find({});
    res.locals.lists = data;
    next();
  },

  async createList(req, res, next) {
    console.log('in createList middleware');
    const data = await List.create({ title: ' ' });
    console.log(data);
    res.locals._id = data._id;
    // console.log(data);
    next();
  },

  async saveList(req, res, next) {
    console.log('in saveList middleware');
    const { title, team, tasks, _id } = req.body;
    const updated = await List.updateOne(
      { _id },
      { title, team, taskArr: tasks },
      { new: true }
    );
    res.locals.updated = updated;
    next();
  },

  async deleteList(req, res, next) {
    const { _id } = req.body;

    const deleted = await List.deleteOne({ _id });
    console.log(deleted);
    next();
  },

  // REFERENCE USERS BUT MODIFYING LIST -
  // save username in state, then when we create List just pass that state in to request
  // this will allow us to move the user functionality into the user controller
  // updated schema.lost to List
  //add functionality to check if username exists
  async assignUser(req, res, next) {
    const { username, _id, task } = req.body;
    const list = await List.findOne({ _id });
    list.taskArr.forEach((obj) => {
      if (obj.task === task) {
        obj.assignedUser = username;
      }
    });
    const updated = await List.updateOne({ _id }, { taskArr: list.taskArr });
    next();
  },

  async unassignUser(req, res, next) {
    const { _id, task } = req.body;

    const list = await List.findOne({ _id });
    list.taskArr.forEach((obj) => {
      if (obj.task === task) {
        delete obj.assignedUser;
      }
    });
    const updated = await List.updateOne({ _id }, { taskArr: list.taskArr });
    next();
  }
};

module.exports = listController;
