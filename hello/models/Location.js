// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//not yet finished 
// create a schema
var locationSchema = new Schema({
	username: String,
	location: String
});

// the schema is useless so far
// we need to create a model using it
var Location = mongoose.model('Location', locationSchema);

// make this available to our users in our Node applications
module.exports = Location;