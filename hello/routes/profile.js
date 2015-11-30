var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/User');
var Location = require('../models/Location');
var ImageLocation = require('../models/imageLocation');
var textMessage = require('../models/textMessage');
var formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra'),
    qt   = require('quickthumb'),
    file = require('fs');
var LOC;
var loggedIn = false;
var dir;
var USERNAME, USER;

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
// will redirect to profile page of professor 
// res.render('unverifiedView',{fname: user.firstName, lname: user.lastName, university: user.college, email: user.email, verify: user.verify});
router.get('/', isLoggedIn, function(req, res, next) {
	var userInfo = req.user;
	USERNAME = userInfo.local.email;
	USER = userInfo;
	res.render('profileView',{
		fname: userInfo.local.firstName, 
		lname: userInfo.local.lastName,
		university: userInfo.local.college, 
		email: userInfo.local.email, 
		vip: userInfo.local.vip});
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
var valid = true;
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.redirect('/profile');
  });
	form.on('progress', function(bytesReceived, bytesExpected) {
    if (bytesReceived > 20971520) {
        valid = false;
    }
});
  form.on('end', function(fields, files) {
  if(valid){
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
  //  var fileSize = getFilesizeInBytes(file_name);
   // console.log(fileSize);
    var imageLoc = ImageLocation({
    				filename: file_name,
    				location: LOC.city   	
    });
    imageLoc.save(function(err,imageLoc){
		
		if(err) return console.error(err);
		//saveLocation(LOC.username,LOC.city);
		//res.json(getLocation);
		});
   // var new_location = 'uploads/';
	
    fs.copy(temp_path, dir + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!");
      }
    });
    }
  });
  
});


router.post('/uploadText', function (req, res){


  var message = req.body;
  
  
  if(message.alert == "on")
        message.alert = "Y";
   else
        message.alert = "N";
  
  if(message.alert == "Y" && req.user.local.vip != "Y"){
        message.alert = "N";
    }
  
  var temp = "";
  var text  = textMessage({
                text: message.message,
                username: req.user.local.email,
                alert: message.alert  
  });
  console.log(text);
  text.save(function(err,temp){
		console.log(temp);
		if(err) return console.error(err);
		//saveLocation(LOC.username,LOC.city);
		res.redirect('/profile');
		
		});
  
});


router.post('/getText', function (req, res){
 // console.log(req.body);
  textMessage.find(function(err, data){
			//console.log(data);
			if(err) return console.error(err);
			
			res.json(data);
			});

});

router.post('/isVip', function (req, res){
 // console.log(req.body);
 
 textMessage.find(function(err, data){
			
			if(err) return console.error(err);
			console.log(USER.local.vip)
			res.json(USER.local.vip);
			});
  

});
router.post('/Location', function(req, res, next) {
	var temp = req.body;
	var repeat = false;
	//LOC = req.body;
	if(loggedIn){
	
		console.log("logged in");
		console.log(req.body);
		temp.city = temp.city.replace(/ /g, '_');
		//console.log(LOC.city+" "+temp.city+" " +req.user.local.email+ " " +USERNAME);
		if (LOC === undefined || LOC === null || LOC.city != temp.city) {
    		LOC = temp;
    		LOC.username = USERNAME;
    		console.log(LOC.city);
		}
		else if(LOC.city == temp.city && LOC.username == USERNAME){
			repeat = true;
			console.log("repeat");
		}

		if(true){
			dir = 'uploads/' + LOC.city+"/";
            console.log(dir);
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
			getLocations(req,res,next,getLocation);
				//res.json(dir);
			});
		
			
     	}
     
     }
});
function getFilesizeInBytes(filename) {
 var stats = file.statSync(filename)
 var fileSizeInBytes = stats["size"]
 return fileSizeInBytes
}
function getLocations(req,res,next,getLocation){
Location.distinct("location",{username:LOC.username}, function(err, getLocation){
			console.log(getLocation);
			if(err) return console.error(err);
			console.log("User Location done");
			res.json(getLocation);
			});


}
module.exports = router;
