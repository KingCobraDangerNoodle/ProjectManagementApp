const List = require('./list.js');

class User {
  constructor(username, password, id, lists) {
    this.username = username || null;
    this.password = password || null;
    this.id = id || null;
    this.lists = lists || [];
  }
}

module.exports = User;
