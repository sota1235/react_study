var express = require('express');
var router = express.Router();

/* GET apis listing. */
router.get('/', function(req, res, next) {
  var data = [
    {author: "Pete Hunt",    text: "This is one comment."},
    {author: "Jordan Walle", text: "This is *another* comment."}
  ]
  res.json(data);
});

router.post('/', function(req, res, next) {
  res.json([req.body]);
});

module.exports = router;
