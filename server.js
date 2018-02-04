const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://canopus:000000@ds125068.mlab.com:25068/notebook-express');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  app.listen(3000, () => {
    console.log('Listening on port 3000...');
  });
});
