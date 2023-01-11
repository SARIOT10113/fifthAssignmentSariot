const mongoose = require('mongoose');
const TodoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user"
    },
    title:{
        type: String,
        required: true,
        unique:true,
    },
    description:{
        type: String,
        required: true,
    },
    

},{timestamps: true,versionKey: false});

const TodoModel = mongoose.model('todos',TodoSchema);
module.exports = TodoModel