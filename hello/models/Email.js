// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//store all emails from prof 
//will add to his account accourding 
//to courses he/she is teaching
//http://mongoosejs.com/docs/guide.html

//not yet finished 
//need to do further testing 
// create a schema
var emailSchema = new Schema({
	idAccount: String,
	courseID: String,
	email: [String]
});

// the schema is useless so far
// we need to create a model using it
var Email = mongoose.model('Email', emailSchema);

// make this available to our users in our Node applications
module.exports = Email;
