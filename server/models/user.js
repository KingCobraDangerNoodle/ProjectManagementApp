// const mongoose = require('mongoose');

// import { ids } from 'webpack';

// // prefer to change this to user as all people are users in our app and
// // future develops can give users different roles ie general role, team leader, admin, etc
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const user = mongoose.model('user', userSchema, 'user');

// module.exports = user;

class User {
  constructor(username, password, id) {
    this.username = username || null;
    this.password = password || null;
    this.id = id || null;
  }
}

module.exports = User;
