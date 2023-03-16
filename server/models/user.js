const List = require('./list.js');

class User {
  constructor(username, password, id) {
    this.username = username || null;
    this.password = password || null;
    this.id = id || null;
  }
}

module.exports = User;
