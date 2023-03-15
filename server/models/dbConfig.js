const mongoose = require('mongoose');

// update this to use process variables
const MONGO_URI =
  'mongodb+srv://zacharythejesus:MQ5qEWGEEZgX8nLj@pm-app.k8txydl.mongodb.net/?retryWrites=true&w=majority';

mongoose.pluralize(null);

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'jobs'
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// want to declare schema here and export it for use in the models
const Schema = mongoose.Schema;
// default export so models can access db
module.exports = { mongoose, Schema };
