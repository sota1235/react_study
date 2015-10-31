var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comments = new Schema({
  author: String,
  text: String,
  date: Date
});

Comments.pre('save', function(next) {
  this.date = new Date();
  next();
});

mongoose.model('Comments', Comments);

mongoose.connect('mongodb://localhost/comments');

var Comments;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to 'comments' database");
  Comments = mongoose.model('Comments');
  populateDB();
});

var findAll = function() {
  return new Promise(function(resolve, reject) {
    console.log('Getting comment list');

    Comments.find({}, function(err, results) {
      if (err) {
        reject({'error': 'An error has occurred'});
      } else {
        console.log('Success: Getting comments');
        resolve(results);
      }
    });
  });
};

var addComment = function(req) {
  return new Promise(function(resolve, reject) {
    var comment = req.body;
    console.log('Adding comment: ' + JSON.stringify(comment));

    var addComment = new Comments(comment);
    addComment.save(function(err, result) {
      if (err) {
        reject({'error': 'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result));
        resolve(result);
      }
    });
  });
};

var populateDB = function() {

  var comments = [
  {author: "Pete Hunt",    text: "This is one comment."},
  {author: "Jordan Walle", text: "This is *another* comment."}
  ];

  Comments.remove(function(err) {
    if (err) {
      console.log('error: An error has occurred - ' + err);
    }
  });

  Comments.create(comments, function(err) {
    if (err) {
      console.log('error: An error has occurred - ' + err);
    }
  });
};

/* GET apis listing. */
router.get('/', function(req, res, next) {
  findAll()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.post('/', function(req, res, next) {
  addComment(req, res)
    .then(function(result) {
      findAll()
        .then(function(data) { res.json(data); });
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
