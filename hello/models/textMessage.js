// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//information to store from json
// {'FirstName': fname, 'LastName': lname, 'Email': email, 'College': college, 'Password': password};

// create a schema
var textMessageSchema = new Schema({
  text: String,
  username: String,
  alert: String
});

// the schema is useless so far
// we need to create a model using it
var textMessage = mongoose.model('textMessage', textMessageSchema);

// make this available to our users in our Node applications
module.exports = textMessage;