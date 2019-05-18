const mongoose = require('mongoose');
const user = require('./user');

const todoSchema = mongoose.Schema({
    title: {type : String,required :[true,"Title is required"]},
    content: {type : String,required : true},
    date:{type: Date,optional: true},
    priority:{type: String,required : true},
    priority_num:{type: Number}
});

module.exports= mongoose.model('todo',todoSchema);