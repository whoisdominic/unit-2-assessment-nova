const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ToDoSchema = new Schema({
    entry: {
        type: String,
        required: true,
        unique: false
    },
    done: Boolean
}, {
    timestamps: true
});

const ToDo = mongoose.model('ToDo', ToDoSchema);
module.exports = ToDo;