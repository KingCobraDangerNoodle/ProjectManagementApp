const { mongoose, Schema } = require('./dbConfig');

const listSchema = new Schema({
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

const list = mongoose.model('list', listSchema);

module.exports = list;
