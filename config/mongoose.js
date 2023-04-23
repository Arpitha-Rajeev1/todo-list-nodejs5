const mongoose = require('mongoose');
// connecting to mongo db compass
mongoose.connect('mongodb://localhost/todo_app_db');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to DB'))
db.once('open', function() {
    console.log('Successfully connected to the database');
})