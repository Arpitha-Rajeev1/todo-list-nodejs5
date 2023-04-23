const express = require('express');
const app = express();
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Task = require('./models/task');

// setting up the view for ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.static('assets'));

// retrieving from database
app.get('/', function(req, res){
    Task.find({}).then((tasks) => {
        return res.render('home',{
            title: "Tasks",
            tasks: tasks
        });
    }).catch((err) => {
        console.error(err)
    })
})

// storing the task in database
app.post('/create-task', function(req, res){
    Task.create({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        date: req.body.date
    }).then((newTask) => {
        console.log('*******', newTask);
        return res.redirect('back');
    }).catch((err) => {
        console.error(err);
    })
});

// deleting from the database
app.get('/delete-task/', function(req, res){
    let id = req.query.id;
    Task.findByIdAndDelete(id).then(() => {
        return res.redirect('back')
    }).catch((err) => {
        console.log('Error in deleting the database', err);
        return;
    })
});

app.listen(port, function(err) {
    if(err) {
        console.log('Error in running the server: ', err);
    }
    console.log('Server is running on the port: ', port);
})