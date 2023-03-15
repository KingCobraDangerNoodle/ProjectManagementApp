const mongoose = require('mongoose');

// prefer to change this to user as all people are users in our app and
// future develops can give users different roles ie general role, team leader, admin, etc
const personSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const people = mongoose.model('people', personSchema, 'people');

module.exports = people;
