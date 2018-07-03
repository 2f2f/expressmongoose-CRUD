var express = require('express');
var router = express.Router();
var Employee = require('../models/employee_model');
//var data = require('../data/database.json');
var employee_controller = require('../controllers/employee_controller.js');


//get routes for view
router.get('/view' , employee_controller.DisplayData)

router.get('/view/:userid', employee_controller.ViewDetail)

//EDIT

router.get('/edit' , employee_controller.EditEmployeeList)

router.get('/edit/:userid' , employee_controller.EditEmployeeDetail)

router.post('/edit/:userid' , employee_controller.EditEmployee)

//DELETE

router.get('/del' , employee_controller.DeleteEmployeeList)

router.get('/del/:userid' , employee_controller.DeleteEmployeeDetail)

router.post('/del/:userid' , employee_controller.DeleteEmployee)



//add get and post
router.post('/add' , employee_controller.AddEmployee)

router.get('/add' , function( req , res){
    res.render('./add_emp.pug')
})
module.exports = router;