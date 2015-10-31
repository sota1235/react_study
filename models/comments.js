/**
 * comments.js
 *
 * Description:
 *  connecting DB and get comment data
 *
 * Author:
 *  @sota1235
 */

var mongoose = require('mongoose');

var Comments = function(app) {
  var CommentsSchema = new mongoose.Schema({
    author: String,
    text: String,
    date: Date
  });

  CommentsSchema.pre('save', function(next) {
    this.date = new Date();
    next();
  });

  mongoose.model('Comments', CommentsSchema);
  mongoose.connect('mongodb://localhost/comments');

  var Comments;

  /* db initialize */
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Connected to 'comments' database");
    Comments = mongoose.model('Comments');
  });

  /* Functions */
  // return all comment data
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

  // add comment data from request body
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

  return {
    findAll: findAll,
    addComment: addComment
  };
};

module.exports.Comments = Comments();
