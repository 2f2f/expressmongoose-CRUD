var express = require('express'); 
var app = express();

//Use mongo connection
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://danbrown:spider123@ds145293.mlab.com:45293/employees';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


//require views
var bodyParser = require('body-parser')
const expressValidator = require('express-validator')
var index = require('./routes/index.js')
var home = require('./routes/home.js')
var employee = require('./routes/employee.js')

//var users = require('./routes/users');

app.set('port',3000)
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use('/', index);
app.use('/home' , home);
app.use('/' , employee);



//app.use('/routes',users);
app.listen(3000);
module.exports = app;












