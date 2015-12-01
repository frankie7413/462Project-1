var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/User');
//var LogIn = require('../models/LogIn');


// =====================================
// HOME PAGE ===========================
// =====================================
router.get('/', function(req, res, next) {

	res.render('index');
	
});

// =====================================
// SIGNUP/LOGIN PAGE ===================
// =====================================
router.get('/start', function(req, res, next) {

  res.render('professorStart');
  
});

router.get('/success', function(req, res, next) {

  res.json({'url': true});
  
});

router.get('/fail', function(req, res, next) {

  res.json({'url': false, message: req.flash('loginMessage')});
});

router.get('/failSign', function(req, res, next) {

  res.json({'url': false, message: req.flash('signupMessage')});
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
//messge is error
router.get('/login', function(req, res, next) {

	res.render('professorStart', { message: req.flash('loginMessage') });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/success', // redirect to the secure profile section
    failureRedirect : '/fail', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
// message is error
router.get('/signup', function(req, res, next) {
    // render the page and pass in any flash data if it exists
    res.render('professorStart', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/success', // redirect to the secure profile section
    failureRedirect : '/failSign', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// process the signup form
router.post('/resetPass', function (req, res){
  var check = req.body;
// var resetPass = User({
// 
// 		email        : check.Email,
//         password     : '123456aB',
//         firstName    : 'dude',
//         lastName     : 'dudu',
//         secretAnswer : 'ddd',
//         secretQuestion: 'dee',
//         occupation	 : 'dee',
//         verify       : 'dee'
// 
// });

console.log(check.email+"F");

User.findOne({ 'local.email' :  check.email, 'local.secretAnswer' : check.secretAnswer }, function(err, user) {
            // if there are any errors, return the error
            if (err)
              console.log(err);

            // check to see if theres already a user with that email
            if (user) {
              updatePassword(user,check,res);
           } else {
            res.json({'message': 'User does not exist.'});
          }
        });    
});

function updatePassword(user,check,res){
console.log(check.password);
var newUser = User();
var pass = newUser.generateHash(check.password);
console.log(newUser.generateHash(check.password));
	User.update({'local.email' :  check.email}, {$set:{'local.password' : pass}}, function(err, result) {
    if (err)
        console.log("errorrrrr");
    res.json({'change': true});
});;
      		
} 

function saveUser(user,check){

   var temp = new User();
      temp = user;
      temp.password = check.password;
      console.log(temp);
      
      
		temp.save(function(err,temp) {
                    if (err){
                        console.log("ERRR"+temp);
                        }
                    
                });


}

module.exports = router;




























