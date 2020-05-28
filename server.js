const express = require('express'); //Express
const app = express(); //Create app object
const mongoose = require('mongoose'); //bring in mongoose
const methodOverride = require('method-override'); //Method Override
require('dotenv').config(); //Process.env holds all your env variables
const PORT = process.env.PORT || 3000; // Port Number
const DBURI = process.env.MONGODBURI; //Mongo DB URI


// middleware
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//Controllers

// mongoose connection
const db = mongoose.connection;

const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/unit2assesment";

// Connect to Mongo
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));
// open the connection to mongo
db.on("open", () => {});

const ToDo = require("./models/todo.js");

//////////////////////////
// Routes
//////////////////////////

// Index
app.get("/", (req, res) => {
    ToDo.find({}, (err, toDoList) => {
        if (err) {
            console.log(err);
        } else {
            console.log('List in index', toDoList);
            res.render("Index", {
                todos: toDoList
            });
        }
    })
});

// New
app.post('/todo', (req, res) => {
    ToDo.create({
        entry: req.body.entry,
        done: false
    }, (err, createdToDo) => {
        if (err) {
            console.log(err);
        } else {
            console.log(createdToDo);
            res.redirect('/')
        }
    })
})

app.put('/todo/:id', (req, res) => {
    ToDo.findByIdAndUpdate(req.params.id, {
        done: true
    }, (err, data) => {
        res.redirect('/')
    })
})

app.delete('/todo/:id', (req, res) => {
    ToDo.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/')
    })
})

//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));