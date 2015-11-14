var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/User');
var Location = require('../models/Location');
var ImageLocation = require('../models/imageLocation');
var formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra'),
    qt   = require('quickthumb'),
    file = require('fs');
var LOC;
var loggedIn = false;

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
// will redirect to profile page of professor 
// res.render('unverifiedView',{fname: user.firstName, lname: user.lastName, university: user.college, email: user.email, verify: user.verify});
router.get('/', isLoggedIn, function(req, res, next) {
	var userInfo = req.user;
	res.render('profileView',{
		fname: userInfo.local.firstName, 
		lname: userInfo.local.lastName,
		university: userInfo.local.college, 
		email: userInfo.local.email, 
		verify: userInfo.local.verify});
});

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
    	loggedIn = true;
        return next();
        }

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});


router.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.redirect('/profile');
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
	if(loggedIn){
	
		console.log("logged in");
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
		var dir = 'uploads/' + LOC.city;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
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
     
     }
});

module.exports = router;
