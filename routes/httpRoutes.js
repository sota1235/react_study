/**
 * httpRoutes.js
 *
 * Description:
 *  routting file for http requests
 *
 * Author:
 *  @sota1235
 */

module.exports = function(app) {
  var Comments = app.get('models').Comments;

  // index
  app.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
  });

  // /users
  app.get('/users', function(req, res, next) {
    res.send('respond with a resource');
  });

  // /apis
  app.get('/apis', function(req, res, next) {
    Comments.findAll()
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post('/apis', function(req, res, next) {
    Comments.addComment(req, res)
      .then(function(result) {
        Comments.findAll()
          .then(function(data) { res.json(data); });
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
