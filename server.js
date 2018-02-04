const express = require('express');
const mongoose = require('mongoose');
const join = require('path').join;
const path = require('path');
const Note = require('./models/notebook');
const bodyParser = require('body-Parser');

const app = express();


// connect to MongoDB

mongoose.connect('mongodb://canopus:000000@ds125068.mlab.com:25068/notebook-express');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  app.listen(3000, () => {
    console.log('Listening on port 3000...');
  });
});

// app config

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set ('viem engine', 'ejs');

// set routes
var notebook = require('./controllers/notebook.controller.js');

// index
app.get('/', notebook.index);  

// new
app.get('/new', notebook.new);

// create
app.post('/create', notebook.create);

// edit
app.get('/edit/:noteId', notebook.edit);

// update
app.post('/update/:noteId', notebook.update);

// delete
app.post('/delete/:noteId', notebook.delete)
