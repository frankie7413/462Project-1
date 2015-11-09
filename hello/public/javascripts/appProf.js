var main = function() {
	var college,
		fname,
		lname,
		email,
		password,
		passwordType,
		missingField,
		$content,
		errors = [],
		logEmail,
		logPassword,
		regInfo,
		loginInfo;
		
	loadScript();
	geoTest();
	//Sign up section create database entry
	//makes sure that the fields have a valid input and fowards content to server
	function SectionmissingField(check){
		console.log('checking fields');
		if(check === false){
			$('#fillSection').empty(); //for when user does nor fill fields properly
			$('#fillSection').append('Please fill in area(s) with *.');
		} else {
			console.log('Inputs are complete');
			//PostInformation();
			regInfo = {'Email': email,'Password': password};
			$.post("/SignUp", regInfo, function(data){
				PostInformation(data);
			});
		}
	}

	function logError(errCheck){
		$('#logFill').empty(); //for when user does nor fill fields properly
			
		if(errCheck === 'password'){
			$('#logFill').append('*Password does not match Email.');
		}
		else {
			$('#logFill').append('User does not Exist. Please Enter Valid Credenatials.');
		}

	}

	//Query database to see if user exist!
	//makes sure that the fields have a valid input and fowards content to server
	function logField(check){
		console.log('checking fields');
		if(check === false){
			$('#logFill').empty();
			$('#logFill').append('Please fill in area(s) with *.');
		} else {
			console.log('Inputs are complete');
			loginInfo = {'Email': logEmail, 'Password': logPassword};
			$.post("/Login", loginInfo, function(status){
				if(status.logon) {
					window.location = 'users';
				}
				else if(status.password){
					logError('password');
				}
				else {
					logError('exist');
				}
			});
		}
	}

	//going to suppy information to sql server 
	//check to see if information send is correctly formmatted. 
	function PostInformation (data) {
		console.log('suppose to empty');
		$('#submitForm').empty();
		$('#submitForm').append($('<p class="text-center">').text('Your infomation that you entered:'));

		$content = $('<ul class="text-center">');
		$content.append($('<li>').text('Email: '+ data.Email));
		$content.append($('<li>').text('password: '+ data.Password));

		$('#submitForm').append($content);
	}


	//http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	function validateEmail(email) {
    	//var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	var re = /^([\w-]+(?:\.[\w-]+)*)@csu.fullerton\.edu/i;
    	return re.test(email);
	}

	function checkPassword (passwordVerify) {
		if (password === passwordVerify){
			if(validatePassword(passwordVerify)){
				$('#repasswordText').empty();
				$('#repasswordText').append('Retype-Password: ');
			} else {
				console.log('did not pass validation Password');
				missingField = false;
				$('#passwordText').empty();
				$('#passwordText').append('Password:* Password did not meet requirements');
				$('#repasswordText').empty();
				$('#repasswordText').append('Retype-Password:* Password did not meet requirements');
				$('#password').val(''); 
				$('#passwordType').val(''); 
			}
		} else {
			missingField = false;
			$('#passwordText').empty();
			$('#passwordText').append('Password:* Password did not match');
			$('#repasswordText').empty();
			$('#repasswordText').append('Retype-Password:* Password did not match');
			$('#password').val(''); 
			$('#passwordType').val(''); 

		}
	}

	//http://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
	function validatePassword (testPassword) {
		console.log(testPassword);
		errors = [];
		if(testPassword.length < 8){
			errors.push('Your Password must be at least 8 characters');
		}

		if(testPassword.search(/[a-z]/i) < 0){
			errors.push('Your password must contain at least one letter.');
		}

		if (testPassword.search(/[0-9]/) < 0){
			errors.push(['Your password must contain at least one digit.']);
		}

		if (errors.length > 0){
			alert(errors.join('\n'));
			return false;
		}
		return true;
	}

	$('#logButton').click(function(){
		missingField = true;

		if($('#logEmail').val() === ''){
			missingField = false;
			$('#logEmailText').empty();
			$('#logEmailText').append('Email:*');
		} else {
			logEmail = $('#logEmail').val();
			if(validateEmail(logEmail)){
				console.log(logEmail);
				console.log('valid email login');
				$('#logEmailText').empty();
				$('#logEmailText').append('Email:');
			} else {
				missingField = false;
				logEmail = '';
				$('#logEmail').val('');
				$('#logEmailText').empty();
				$('#logEmailText').append('Email:* Please Enter Valid Email');
			}
		}

		if($('#logPassword').val() === ''){
			missingField = false;
			$('#logPasswordText').empty();
			$('#logPasswordText').append('Password: *');
		} else {
			logPassword = $('#logPassword').val();
			if(validatePassword(logPassword)){
				console.log('Valid Password');
				console.log(logPassword);
				$('#logPasswordText').empty();
				$('#logPasswordText').append('Password:');
			} else{
				missingField = false;
				logPassword = '';
				$('#logPassword').val('');
				$('#logPasswordText').empty();
				$('#logPasswordText').append('Password:* Please Enter Valid Password');
			}
		}

		logField(missingField);
	});


	//checks that all the fields have an input by user
	$('#signButton').click(function(){

		missingField = true;

		if($('#colleges').val() === 'college'){
			missingField = false;
			$('#collegeOption').empty();
			$('#collegeOption').append('College*');
		}else{
			college = $('#colleges').val();
			$('#collegeOption').empty();
			$('#collegeOption').append('College');
		}

		if($('#fname').val() === ''){
			missingField = false;
			$('#fnameText').empty();
			$('#fnameText').append('First Name:*');
		}else {
			fname = $('#fname').val();
			$('#fnameText').empty();
			$('#fnameText').append('First Name:');
		}

		if($('#lname').val() === ''){
			missingField = false;
			$('#lnameText').empty();
			$('#lnameText').append('Last Name:*');
		}else {
			lname = $('#lname').val();
			$('#lnameText').empty();
			$('#lnameText').append('Last Name:');
		}

		if($('#email').val() === ''){
			missingField = false;
			$('#emailText').empty();
			$('#emailText').append('Email:*');
		}else {
			email = $('#email').val();
			if(validateEmail(email)){
				$('#emailText').empty();
				$('#emailText').append('Email: ');
				console.log(email);
				console.log('valid email');
			} else {
				missingField = false;
				$('#emailText').empty();
				$('#emailText').append('Email:* Enter Valid Email');
			}
		}

		if($('#password').val() === ''){
			missingField = false;
			$('#passwordText').empty();
			$('#passwordText').append('Password:*');
		}else {
			password = $('#password').val();
			$('#passwordText').empty();
			$('#passwordText').append('Password:');
		}

		if($('#passwordType').val() === ''){
			missingField = false;
			$('#repasswordText').empty();
			$('#repasswordText').append('Retype-Password:*');
		}else {
			passwordType = $('#passwordType').val();
			checkPassword(passwordType); 
		}

		SectionmissingField(missingField);

	});
};

function geoTest() {
 
    $.get("http://ipinfo.io", function (response) {
    $("#ip").html("IP: " + response.ip);
    
    city = response.city;
   console.log(city);
   var loc = {"city": city, "username": "frankthetank"};
   $.post("/Location", loc, function(data){
				console.log("geoTest");
				
				console.log(data[0]+" "+data[1]);
			});
}, "jsonp");
}

$(document).ready(main);

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  //script.src = "http://www.google.com/jsapi";
  document.body.appendChild(script);
  console.log("H");
}


//http://jshint.com/
//configure enable jquery


























