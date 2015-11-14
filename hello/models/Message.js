// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//not yet finished 
// create a schema
var messageSchema = new Schema({
	college: String,
	major: String,
	course: String,
	subject: String,
	email: String,
	body: String;
});

// the schema is useless so far
// we need to create a model using it
var Message = mongoose.model('Message', messageSchema);

// make this available to our users in our Node applications
module.exports = Message;