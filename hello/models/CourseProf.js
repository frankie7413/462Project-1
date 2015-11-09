// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// CourseProf
// {
// 	idAccount: 1654165135
// 	Prof: firstname blah blah
// 	college: CSUF
// 	major: computer science 
// 	semester: fall 
// 	year: 2015
// 	class: CS335
// 	_id
// }

//CS335 - Gofman


//not yet finished 
// create a schema
var courseDescriptionSchema = new Schema({
	idAccount: String,
	fname: String,
	lname: String,
	college: String,
	major: String,
	semester: String,
	year: String, 
	course: String,
});

// the schema is useless so far
// we need to create a model using it
var CourseProf= mongoose.model('CourseProf', courseDescriptionSchema);

// make this available to our users in our Node applications
module.exports = CourseProf;
