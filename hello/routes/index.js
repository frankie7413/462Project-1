var express = require('express');
var router = express.Router();

var User = require('../models/User');
var LogIn = require('../models/LogIn');
var Location = require('../models/Location');
var ImageLocation = require('../models/imageLocation');
var sess;
var formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra'),
    qt   = require('quickthumb');
var LOC;

//@functions saveLogin @param email, password
//calls LogIn database to create a new item to store 
//using email and passowerd param
function saveLogin(username, password){
	var newLogIn = LogIn({
		username: username,
		password: password
	});

	newLogIn.save(function(err, newLogIn){
		if(err) return console.error(err);
		console.log('Log in Created');
	});
}
function saveLocation(username,location){
	var userLocation = Location({
		username: username,
		location: location
	});

	userLocation.save(function(err, userLocation){
		if(err) return console.error(err);
		console.log('lcoation c');
	});
}

//@route GET / displays home page if user is not signed up
//or redirects user to user page if their session is still
//active
router.get('/', function(req, res, next) {

	console.log('Inisde / call');

	sess = req.session;

	//check to see if username session is active
	if(sess.username){
		//redirect to prof page
		console.log('User session still working!');
		res.redirect('/users');
	} else {
		//takes back to start page
		console.log('user not exist');
		res.render('index');
	}

});

//@route GET /start will display professor sign up & login page
router.get('/Start', function(req, res, next) {
  res.render('professorStart');
});


//@proute POST /Login will check to see if user credentials are valid
//return json to allow user login since credentials match
//return json to deny user login since credentials don't match
//return json to deny user login since user not exist 
//http://passportjs.org/docs/username-password
//going to change this function as soon as i learn passportjs
router.post('/Login', function(req, res, next) {
	console.log('Login called');
	var logInfo = req.body;
	
	LogIn.findOne({ email: logInfo.Email }, function(err, user) {
  		if(!err){
  			if(user !== null){
  				if(user.password === logInfo.Password){
  					sess = req.session;
  					sess.username = logInfo.Email;
  					res.json({'logon': true});
  				}
  				else {
  					console.log('Password not match');
  					res.json({'logon': false, 'password': true});
  				}
  			}else{
  				console.log('User does not exist');
  				res.json({'logon': false, 'password': false});
  			}
  		}
  	});
});

//@route POST /SignUp will parse information from user client to create account
// that will create accoutn and login db. 
//saveLogin() function takes email and password from req.body to create login db
//information to store from json
// {'FirstName': fname, 'LastName': lname, 'Email': email, 'College': college, 'Password': password};
router.post('/SignUp', function(req, res, next) {
	var valid = 'unverified';
	var reginfo = req.body;
	console.log('Sign up post called');

	var newUser = User({
		email: reginfo.Email,
		password: reginfo.Password,
		verify: valid
	});

	newUser.save(function(err, newUser){
		if(err) return console.error(err);
		console.log('User Created');
		saveLogin(reginfo.Email, reginfo.Password);

		res.json(reginfo);
	});
});

router.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.render('index');
  });
	
  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
    
    var imageLoc = ImageLocation({
    				filename: file_name,
    				location: LOC.city   	
    });
    imageLoc.save(function(err,imageLoc){
		
		if(err) return console.error(err);
		//saveLocation(LOC.username,LOC.city);
		//res.json(getLocation);
		});
    var new_location = 'uploads/';
	
    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
});


router.post('/Location', function(req, res, next) {
	var temp = req.body;
	var repeat = false;
	//LOC = req.body;
	
	temp.city = temp.city.replace(/ /g, '_');
	if (LOC === undefined || LOC === null) {
    	LOC = temp;
    	console.log(LOC.city);
	}
	else if(LOC.city == temp.city && LOC.username == temp.username){
		repeat = true;
		console.log("repeat");
	}
	
	

	if(!repeat){
		console.log("!repeat");
		var getLocation = Location({
						username: LOC.username,
						location: LOC.city
						});
						
			getLocation.save(function(err,getLocation){
		
			if(err) return console.error(err);
			//saveLocation(LOC.username,LOC.city);
			console.log("User Location done");
				//res.json(getLocation);
			});
		
			Location.distinct("location",{username:"frankthetank"}, function(err, getLocation){
			console.log(getLocation);
			if(err) return console.error(err);
			console.log("User Location done");
			res.json(getLocation);
			});
     }
});
//@route GET /Recovery will genrate recovery page
//will have user to enter email to send email to account 
//enter valid email 
//check against db
//if found generate email to send recovery password 
//need mailer
router.get('/Recovery', function(req, res, next) {
  res.render('Recovery');
});



module.exports = router;





























