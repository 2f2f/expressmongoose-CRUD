var Employee = require('./models/employee_model') 


var mongoose = require('mongoose');
var mongoDB = 'mongodb://username:password@ds145293.mlab.com:45293/employees'
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open',function(){
    console.log('connected')
    var arr = [
        {name:"Employee0",dept:"Department1",leaves:3,manager : "Manager1"},
        {name:"Employee1",dept:"Department2",leaves:6,manager : "Manager2"},
        {name:"Employee2",dept:"Department3",leaves:2,manager : "Manager2"},
        {name:"Employee3",dept:"Department1",leaves:1,manager : "Manager1"},
        {name:"Employee4",dept:"Department1",leaves:55,manager : "Manager1"},
        {name:"Employee5",dept:"Department2",leaves:31,manager : "Manager1"}    
    ]
    Employee.insertMany(arr,function(err , res){
        console.log("inserted" + arr.length)
        mongoose.connection.close()
    })
    
})
