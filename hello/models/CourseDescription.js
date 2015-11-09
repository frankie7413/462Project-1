// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// courseDescription
// {
// 	college: CSUF
// 	major: computer science
// 	semester: fall
// 	year: 2015
// 	course: 335
// }

//not yet finished 
// create a schema
var courseDescriptionSchema = new Schema({
	college: String,
	major: String,
	semester: String,
	year: String, 
	course: String,
});

// the schema is useless so far
// we need to create a model using it
var CourseDescription = mongoose.model('CourseDescription', courseDescriptionSchema);

// make this available to our users in our Node applications
module.exports = CourseDescription;