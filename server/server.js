const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const routes = require('./routes/routes.js');
const mongoose = require('mongoose');
require('dotenv').config();

// connect database
const MONGO_URI = process.env.DB_KEY;
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


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
