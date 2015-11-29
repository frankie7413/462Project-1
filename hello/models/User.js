// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//regInfo = {'firstName': fname, 'lastName': lname, 'email': email, 'college': college, 'password': password};
// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        firstName    : String,
        lastName     : String,
        secretAnswer : String,
        secretQuestion: String,
        occupation	 : String,
        vip       : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

// // grab the things we need
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// //information to store from json
// // {'FirstName': fname, 'LastName': lname, 'Email': email, 'College': college, 'Password': password};

// // create a schema
// var userSchema = new Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   college: String,
//   password: String,
//   verify: String
// });

// // the schema is useless so far
// // we need to create a model using it
// var User = mongoose.model('User', userSchema);

// // make this available to our users in our Node applications
// module.exports = User;