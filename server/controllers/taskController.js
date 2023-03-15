const List = require('../models/list.js');
const Task = require('../models/task.js');

const taskController = {
  // If we change the structure of our task schema and response we can eliminate this function
  async createAndAddTask(req, res, next) {
    console.log('in createTask middleware');
    const { _id, task } = req.body;

    const data = await Task.create({ task });
    // console.log(data);
    const currentData = await List.findOne({ _id });
    // console.log(currentData);
    const updated = await List.updateOne(
      { _id },
      { taskArr: [...currentData.taskArr, data] }
    );
    // console.log(updated);
    // console.log(data);
    next();
  },

  async editTask(req, res, next) {
    const { _id, task, newTask } = req.body;
    const list = List.findOne({ _id });
    list.taskArr.forEach((el) => {
      if (el.task === task) {
        el.task = newTask;
      }
    });
  },

  async deleteTask(req, res, next) {
    const { _id, task } = req.body;

    const currentData = await List.findOne({ _id });
    const updated = await List.updateOne(
      // looks like this is never used???
      { _id },
      { taskArr: currentData.taskArr.filter((obj) => obj.task !== task) }
    );
    console.log(currentData);
    next();
  },

  async moveTask(req, res, next) {
    const { idOriginal, idNew, task } = req.body;
    const originalList = await List.findOne({ _id: idOriginal });
    let taskObject = originalList.taskArr.filter((obj) => obj.task === task);
    // console.log(originalList)
    // console.log(taskObject[0])
    const newList = await List.findOne({ _id: idNew });
    // // console.log(newList)
    const removedFromOriginal = await List.updateOne(
      { _id: idOriginal },
      { taskArr: originalList.taskArr.filter((obj) => obj.task !== task) }
    );
    // console.log(removedFromOriginal)
    const addedToNew = await List.updateOne(
      { _id: idNew },
      { taskArr: [...newList.taskArr, taskObject[0]] }
    );
    // // console.log(addedToNew)
    next();
  }
};

module.exports = taskController;
