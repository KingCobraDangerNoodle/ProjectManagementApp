const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // change this to tasks as this will always return an array of tasks
  taskArr: {
    type: Array,
    default: []
  },
  team: String // this does nothing now
});

const list = mongoose.model('list', listSchema, 'list');

module.exports = list;
