const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const Todo = require('../models/todo');
const PORT = process.env.PORT;
const moment=require('moment');

router.use(bodyParser.urlencoded({extended:true}));

/* Show todo list  */
router.get('/',function(req,res) {
  Todo.find({}, function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.render('index.ejs', {todos: todos});
    }
  });
});

/*W rite the todo list */
router.post('/write', function(req, res, next){
  var todo = new Todo({
    title : req.body.title.toString(),
    content : req.body.todoContent.toString(),
    date : req.body.date,
    priority : req.body.priority});
  if(req.body.title==null)
    res.end("Please Write title");
  todo.save( (err)=>{
    if(err)
      return res.status(500).send("Todo create fail");
  });
});

/*Delete the todo list*/
router.delete('/:id',function (req,res) {
  Todo.findByIdAndRemove(req.params.id,function (err,todo) {
    if(err)
      return res.status(500).send("Todo list fail");
    res.status(200).send("Todo : "+todo.title+" delete");
  });
});

/*Edit the todo list*/
router.put('/:id',function (req,res) {
  Todo.findByIdAndUpdate(req.params.id,req.body,{new: true},
      function (err, todo) {
    if(err)
      return res.status(500).send("Edit fail");
    res.status(200).send(todo);
      });
});

module.exports = router;
