// const mongoose = require('mongoose');

const { useImperativeHandle } = require("react");

// const listSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   // change this to tasks as this will always return an array of tasks
//   taskArr: {
//     type: Array,
//     default: []
//   },
//   team: String // this does nothing now
// });

// const list = mongoose.model('list', listSchema, 'list');

class List {
  constructor(userId, title, tasks, listId) {
    this.userId = userId; //used as foreign key
    this.title = title; //string
    this.tasks = tasks || null; //array of strings
    this.listId = listId || null; //number or null
  }
}

module.exports = List;
