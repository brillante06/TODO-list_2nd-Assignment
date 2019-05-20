const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('../models/todo');
const PORT = process.env.PORT;

router.use(bodyParser.urlencoded({extended:true}));

/* Show todo list sort by priority_num */
router.get('/',function(req,res) {
  Todo.find({}).sort({"priority_num": 1}).exec(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.render('index.ejs', {todos: todos});
    }
  });
});

/*W rite the todo list */
router.post('/write', function(req, res){
    const title = req.body.todoTitle.toString();
    const content = req.body.todoContent.toString();
    const date = req.body.dates.toString();
    const priority = req.body.priority.toString();
    let num;
    const temp=priority;/**/
    if(temp=='Important')
      num=1;
    else if(temp=='Normal')
      num=2;
    else if(temp=='Not Important')
      num=3;
    const priority_num=num;
    const todoInfo = new Todo({title: title,content:content,date:date,priority:priority,priority_num:priority_num});
    todoInfo.save((err)=>{
      if(err)
        return res.status(500).send("Todo create fail");
      res.redirect('/');
    });
});
/*Delete the todo list*/
router.post('/delete/:id',function (req,res) {
    console.log(req.body);
  Todo.findByIdAndRemove(req.params.id,function (err,todo) {
    if(err)
      return res.status(500).send("Todo delete fail");
    res.redirect('/');
  });
});

/*Edit the todo list, if priority is update,priority_num is also updated*/
router.post('/edit/:id',function (req,res) {
    const title = req.body.todoTitle.toString();
    const content = req.body.todoContent.toString();
    const date = req.body.dates.toString();
    const priority = req.body.priority.toString();
    let num;
    const temp=priority;/**/
    if(temp=='Important')
        num=1;
    else if(temp=='Normal')
        num=2;
    else if(temp=='Not Important')
        num=3;
    const priority_num=num;
    Todo.findByIdAndUpdate(req.params.id,{$set:{title:title, content: content, date:date,priority: priority, priority_num:priority_num}},
        {new: true},
      function (err, todo) {
    if(err)
      return res.status(500).json(err);
    res.redirect('/');
      });
});

module.exports = router;
