var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    name : {type: String, required: true},
    dept : { type: String, required: true },
    leaves: {type: Number, required: true},
    manager: {type: String, required: true}
});

/* Virtual for this book instance URL.
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/'+this._id;
});*/

// Export model.
module.exports = mongoose.model('Employee', EmployeeSchema);