var express = require('express');
var router = express.Router();
var User = require('../models/User');
var usersess;


//@route GET / checks if user session is active 
//if session active will display user page 
//if not redirect to index page 
router.get('/', function(req, res, next) {
	console.log('Inisde user / call');
	usersess = req.session;

	//check to see if username session is active
	if(usersess.username){
		//redirect to prof page
		User.findOne({ email: usersess.username }, function(err, user) {
	  		if(!err){
	  			if(user !== null){
	  				res.render('profileView', {fname: user.firstName, lname: user.lastName, university: user.college, email: user.email, verify: user.verify});
	  				// if(user.session === 'verify') {
	  				// 	res.render('profileView', {fname: user.firstName, lname: user.lastName, university: user.college, email: user.email, verify: user.verify});
	  				// } else {
	  				// 	res.render('unverifiedView',{fname: user.firstName, lname: user.lastName, university: user.college, email: user.email, verify: user.verify});
	  				// }
	  			}else {
	  				console.log('User does not exist or session expired');
	  				res.render('logout');
	  			}
	  		}
	  	});
	} else {
		//takes to log off screen
		console.log('user not active');
		res.redirect('/');
	}
});

//@route POST /Update will parse user input to change
//account db information restrict to fname, lname, password
//email ? 
router.post('/update', function(req, res, next){
	console.log('Update');
});

//@route GET /messagesView will show messages from each course
//query all messages that prof has to client side 
router.get('/messagesView', function(req, res, next){
	//res.render('messagesView', {professorName: sess.email});
	res.render('messagesView');
});

//@route GET /archiveView will show messages of pase courses
//shows past semesters messages
router.get('/archiveView', function(req, res, next){
	//res.render('archiveView', {professorName: sess.email});
	res.render('archiveView');
});

//@route GET /editAccountView renders view edit options
//user can enter fields to change information
router.get('/editAccountView', function(req, res, next){
	res.render('editAccountView');
});

//@route GET /logout signs out user
//destroys session of user will ahve to log back in
//to create another session
router.get('/logout', function(req, res, next){
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}else{
			res.render('logout');
		}
	});
})

module.exports = router;
