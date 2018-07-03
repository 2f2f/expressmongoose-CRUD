var Employee = require('../models/employee_model');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


//view detail
exports.DisplayData = function(req , res){
        Employee.find({ } , 'name -_id' ,function (err,docs){
            res.render('./view_emp',{ data : docs})
            console.log(typeof(data))
        })
    }

 
exports.ViewDetail = function( req , res){
        Employee.find({ name : req.params.userid }, function (err,docs) {
            var data = docs[0].toObject() //u cant se docs.name here,mongoose returns array
            res.render('./view_emp_detail.pug',{ data })
        }) 

}

//EDit
exports.EditEmployeeList = function(req , res){
    Employee.find({ } , 'name -_id' ,function (err,docs){
        res.render('./edit_emp',{ data : docs})
        console.log(typeof(data))
    })
}

exports.EditEmployeeDetail = function(req , res){
    Employee.find({ name : req.params.userid} , function ( err , docs){
        var data = docs[0].toObject()
        res.render('./edit_emp_details' , {data})
    })
}

exports.EditEmployee = [
    body('emp_dept', 'dept required').isLength({ min: 1 }).trim(),
    body('emp_leaves', 'leaves required').isLength({ min: 1 }).trim(),
    body('manager', 'manager required').isLength({ min: 1 }).trim(),
    
    //Sanitize fields
    sanitizeBody('emp_dept').trim().escape(),
    sanitizeBody('emp_leaves').trim().escape(),
    sanitizeBody('manager').trim().escape(),

    // Process request after validation and sanitization.
    (req , res, next) => {
        const errors = validationResult(req) ;
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages
            res.render('edit_emp_details' , { errors: errors.array()})
        } else {
            //Valiid form info
            var query = { name : req.params.userid };
            Employee.findOneAndUpdate( query , {
                dept : req.body.emp_dept,
                manager : req.body.manager,
                leaves : req.body.emp_leaves
            } , function(err , docs){
                if (err) { return next(err); }
                   // Successful - redirect to view page.
                   res.redirect('/view');
            })

        }
    }
]

//DElete
exports.DeleteEmployeeList = function (req , res){
    Employee.find({ } , 'name -_id' ,function (err,docs){
        res.render('./del_emp',{ data : docs})
    })
}

exports.DeleteEmployeeDetail = function(req , res){
    Employee.find({ name : req.params.userid} , function ( err , docs){
        var data = docs[0].toObject()
        res.render('./del_emp_details' , {data})
    })
}

exports.DeleteEmployee = function(req , res){
    Employee.findOneAndRemove({ name : req.params.userid} , function(err , docs){
        if (err) { res.send('Eror')} {
            res.redirect('/view')
        }
    })
}

exports.AddEmployee = [
    // Validate that the name field is not empty.
    body('emp_name', 'name required').isLength({ min: 1 }).trim(),
    body('emp_dept', 'dept required').isLength({ min: 1 }).trim(),
    body('emp_leaves', 'leaves required').isLength({ min: 1 }).trim(),
    body('manager', 'manager required').isLength({ min: 1 }).trim(),
    sanitizeBody('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        var employee = new Employee({
            name : req.body.emp_name,
            dept : req.body.emp_dept,
            leaves : req.body.emp_leaves,
            manager : req.body.manager
        });
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('./add_emp.pug', { errors: errors.array()});
        return;
        } else {
            // Data from form is valid.
            Employee.findOne({'name' : req.body.name})
                .exec(function ( err, foundemp){
                    if (err){
                        res.redirect('/home');
                    } else {
                        employee.save(function (err) {
                            if (err) { return next(err); }
                                // Genre saved. Redirect to genre detail page.
                                res.redirect('./view');
                            });
                    }
                })
            
        }
    }
]


  
  

