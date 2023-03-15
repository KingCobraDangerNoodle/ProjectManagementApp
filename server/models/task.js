const mongoose = require('mongoose');

// rewrite schema to only reference task to eliminate confusion
const taskArrSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: String,
  user: String, // here we have user, is this the user that create task or is assigned task?
});

const taskArr = mongoose.model('taskArr', taskArrSchema, 'taskArr');

module.exports = taskArr;
