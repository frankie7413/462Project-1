// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//information to store from json
// {'FirstName': fname, 'LastName': lname, 'Email': email, 'College': college, 'Password': password};

// create a schema
var imageLocationSchema = new Schema({
  filename: String,
  location: String,
});

// the schema is useless so far
// we need to create a model using it
var imageLocation = mongoose.model('imageLocation', imageLocationSchema);

// make this available to our users in our Node applications
module.exports = imageLocation;