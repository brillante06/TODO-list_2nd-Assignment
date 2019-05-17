var express = require('express');
var router = express.Router();


let TodoSchema={
  title: 'Title',
  content: 'Content',
  deadline:'Deadline', optional:true
};
/* GET users listing. */


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
