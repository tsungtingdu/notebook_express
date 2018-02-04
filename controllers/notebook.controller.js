var Note = require('../models/notebook.js');


// index
exports.index = function (req, res){
  Note.find({}, (function(err, result){
    if (err) return console.log(err);
    console.log(result);
    res.render('index.ejs', {notes: result});
  })
)};

// new
exports.new = function (req, res){
  res.render('new.ejs');
};

// create
exports.create = function (req, res){
  
  var newNote = new Note({
    name: req.body.name,
    title: req.body.title,
    note: req.body.note
  })

  newNote.save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('save to database');
    res.redirect("/");
  });
};

// edit
exports.edit = function(req, res){
  Note.findById(req.params.noteId, function (err, result){
    if (err) return console.log(err);
    res.render('edit.ejs', {note: result});
  });
};


// update
exports.update = function (req, res){
  Note.findByIdAndUpdate(req.params.noteId, { $set: { name: req.body.name, title: req.body.title, note: req.body.note}}, { new: true }, function (err, result) {
    if (err) return console.log(err);
    res.redirect("/");
  });
};

// delete
exports.delete = function(req, res){
  Note.findByIdAndRemove(req.params.noteId, function (err, result) {
    if (err) return console.log(err);
    res.redirect("/");
  });
};