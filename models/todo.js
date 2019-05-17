const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {type : String,required :true},
    content: {type : String,required : true},
    deadline:{type: Date,optional: true},
    priority:{type: String,required : true},
    priority_num:{type: Number}
});

module.exports= mongoose.model('todo',todoSchema);