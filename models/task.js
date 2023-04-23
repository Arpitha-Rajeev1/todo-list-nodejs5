const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    category: {
        type: String,
    },
    date: {
        type: String,
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;