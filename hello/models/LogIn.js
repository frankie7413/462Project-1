// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//information to store from json
// {Email: email, Password: password};

// create a schema
var logInSchema = new Schema({
  email: String,
  password: String
});

// the schema is useless so far
// we need to create a model using it
var LogIn = mongoose.model('LogIn', logInSchema);

// make this available to our users in our Node applications
module.exports = LogIn;