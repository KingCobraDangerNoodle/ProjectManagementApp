const schemas = require('../models/models.js');

//Good Luck//
const controller = {
  async login(req, res, next) {
    console.log('in login middleware');

    let result = await schemas.people.find({ ...req.body });
    // console.log(result);
    if (result.length === 0) {
      res.status(400).send('Username or password is incorrect');
    } else {
      res.locals.people = result;
      next();
    }
  },

  async signup(req, res, next) {
    console.log('in signup middleware');
    const data = await schemas.people.create({ ...req.body });
    console.log(data);
    next();
  },

  async isUnique(req, res, next) {
    console.log('in isUnique middleware');

    const result = await schemas.people.findOne({
      username: req.body.username,
    });
    if (result === null) {
      next();
    } else {
      res.status(400).send('Username already exists');
    }
  },

  async createList(req, res, next) {
    console.log('in createList middleware');
    const data = await schemas.list.create({title: ' '});
    console.log(data)
    res.locals._id = data._id;
    // console.log(data);
    next();
  },

  async saveList(req, res, next){
    console.log('in saveList middleware');
    const {title, team, tasks, _id } = req.body
    const updated = await schemas.list.updateOne({ _id }, { title, team, taskArr: tasks }, { new: true });
    res.locals.updated = updated;
    next();


  },

  async deleteList(req, res, next) {
    const { _id } = req.body;

    const deleted = await schemas.list.deleteOne({ _id });
    console.log(deleted);
    next();
  },

  async createAndAddTask(req, res, next) {
    console.log('in createTask middleware');
    const { _id, task } = req.body;

    const data = await schemas.taskArr.create({ task });
    // console.log(data);
    const currentData = await schemas.list.findOne({ _id });
    // console.log(currentData);
    const updated = await schemas.list.updateOne(
      { _id },
      { taskArr: [...currentData.taskArr, data] }
    );
    // console.log(updated);
    // console.log(data);
    next();
  },

  async editTask(req, res, next) {
    const { _id, task, newTask } = req.body;
    const list = schemas.list.findOne({_id});
    list.taskArr.forEach((el) => {
      if(el.task === task){
        el.task = newTask;
      }
    })
  },

  async deleteTask(req, res, next) {
    const { _id, task } = req.body;

    const currentData = await schemas.list.findOne({ _id });
    const updated = await schemas.list.updateOne(
      { _id },
      { taskArr: currentData.taskArr.filter((obj) => obj.task !== task) }
    );
    console.log(currentData);
    next();
  },

  async moveTask(req, res, next) {
    const { idOriginal, idNew, task } = req.body;
    const originalList = await schemas.list.findOne({ _id: idOriginal });
    let taskObject = originalList.taskArr.filter((obj) => obj.task === task);
    // console.log(originalList)
    // console.log(taskObject[0])
    const newList = await schemas.list.findOne({ _id: idNew });
    // // console.log(newList)
    const removedFromOriginal = await schemas.list.updateOne(
      { _id: idOriginal },
      { taskArr: originalList.taskArr.filter((obj) => obj.task !== task) }
    );
    // console.log(removedFromOriginal)
    const addedToNew = await schemas.list.updateOne(
      { _id: idNew },
      { taskArr: [...newList.taskArr, taskObject[0]] }
    );
    // // console.log(addedToNew)
    next();
  },

  //add functionality to check if username exists
  async assignUser(req, res, next) {
    const { username, _id, task } = req.body;
    const list = await schemas.list.findOne({ _id });
    list.taskArr.forEach((obj) => {
      if (obj.task === task) {
        obj.assignedUser = username;
      }
    });
    const updated = await schemas.list.updateOne(
      { _id },
      { taskArr: list.taskArr }
    );
    next();
  },

  async unassignUser(req, res, next) {
    const { _id, task } = req.body;

    const list = await schemas.list.findOne({ _id });
    list.taskArr.forEach((obj) => {
      if (obj.task === task) {
        delete obj.assignedUser;
      }
    });
    const updated = await schemas.list.updateOne(
      { _id },
      { taskArr: list.taskArr }
    );
    next();
  },

  async home(req,res,next){
    
    const data =  await schemas.list.find({});
    res.locals.lists = data
    next;
  }
};

module.exports = controller;
