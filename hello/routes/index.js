var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/User');
//var LogIn = require('../models/LogIn');
var sess;


// =====================================
// HOME PAGE ===========================
// =====================================
router.get('/', function(req, res, next) {
console.log("!");
	res.render('index');
	
});

// =====================================
// SIGNUP/LOGIN PAGE ===================
// =====================================
router.get('/start', function(req, res, next) {
console.log("2");
  res.render('professorStart');
  
});

router.get('/success', function(req, res, next) {
console.log("3");
  res.json({'url': true});
  
});

router.get('/fail', function(req, res, next) {

  res.json({'url': false});
});


// =====================================
// LOGIN ===============================
// =====================================
// show the login form
//messge is error
router.get('/login', function(req, res, next) {
console.log("4");
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
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


//@route GET /Recovery will genrate recovery page
//will have user to enter email to send email to account 
//enter valid email 
//check against db
//if found generate email to send recovery password 
//need mailer
// router.get('/Recovery', function(req, res, next) {
//   res.render('Recovery');
// });



module.exports = router;




























