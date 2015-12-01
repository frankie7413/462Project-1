var main = function() {
	var secretAnswer,
		occupation,
		secretQuestion,
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
			regInfo = {'firstName': fname, 'lastName': lname, 'email': email, 'secretAnswer': secretAnswer, 'secretQuestion': secretQuestion, 'password': password, 'occupation':occupation, 'vip':'0'};

			$.post("/signUp", regInfo, function(data){
				//PostInformation(data);
				// console.log('/signup called');
				window.location = 'profile';
			});
		}
	}
2
	function logError(errCheck){
		$('#logMessage').empty(); //for when user does not fill fields properly
		$('#logMessage').append(errCheck);
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
			loginInfo = {'email': logEmail, 'password': logPassword};
			$.post("/login", loginInfo, function(status){
				//console.log(data);
				//window.location = 'profile';
				if(status.url) {
					window.location = 'profile';
				}
				else {
					logError(status.message);
				}
			});
		}
	}

	


	//http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	function validateEmail(email) {
    	//var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	var re = /^([\w-]+(?:\.[\w-]+)*)/i;
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
	
	function validateSecretAnswer(secretAnswer){
		console.log(secretAnswer);
		
		if(/^[a-zA-Z0-9- ]*$/.test(secretAnswer) == false || /\s/.test(secretAnswer) ||secretAnswer.length < 4) {
    			return false;
    			
		}
		return true;
	}
	$('#logButton').click(function(){
		missingField = true;
	logEmail = $('#logEmail').val();
	console.log(logEmail+"LL");
		if($('#logEmail').val() === ''){
			missingField = false;
			$('#ErrorMessage').empty();
			$('#ErrorMessage').append('Incorrect Email');
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
				$('#ErrorMessage').empty();
				$('#ErrorMessage').append('Email:* Please Enter Valid Email');
			}
		}

		if($('#logPassword').val() === ''){
			missingField = false;
			$('#ErrorMessage').empty();
			$('#ErrorMessage').append('Incorrect Password');
		} else {
			logPassword = $('#logPassword').val();
			if(validatePassword(logPassword)){
				console.log('Valid Password');
				console.log(logPassword);
			//	$('#logPasswordText').empty();
			//	$('#logPasswordText').append('Password:');
			} else{
				missingField = false;
				logPassword = '';
				$('#logPassword').val('');
				$('#ErrorMessage').empty();
				$('#ErrorMessage').append('Password:* Please Enter Valid Password');
			}
		}

		logField(missingField);
	});


	//checks that all the fields have an input by user
	$('#signButton').click(function(){

		missingField = true;

		if($('#secretAnswer').val() === ''){
			missingField = false;
			$('#secretAnswerText').empty();
			$('#secretAnswerText').append('Secret Question*');
		}else{
				secretAnswer = $('#secretAnswer').val();
			if(validateSecretAnswer(secretAnswer)){
				secretQuestion = $('#secretAnswerList').val();
				console.log(secretQuestion);
				$('#secretAnswerText').empty();
				$('#secretAnswerText').append('Secret Question');
				$('#secretAnswer').empty();
				$('#secretAnswer').append("One word only, must be at least 4 characters");
			}
			else{
				missingField = false;
				$('#secretAnswerText').empty();
				$('#secretAnswerText').append('Secret Question*');
			}
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
		occupation = $('#occupation').val();
		SectionmissingField(missingField);

	});
	$('#vipsignButton').click(function(){

		missingField = true;

		if($('#secretAnswer1').val() === ''){
			missingField = false;
			$('#secretAnswerText1').empty();
			$('#secretAnswerText1').append('Secret Question*');
		}else{
				secretAnswer = $('#secretAnswer1').val();
			if(validateSecretAnswer(secretAnswer)){
				secretQuestion = $('#secretAnswerList1').val();
				console.log(secretQuestion);
				$('#secretAnswerText1').empty();
				$('#secretAnswerText1').append('Secret Question');
				$('#secretAnswer1').empty();
				$('#secretAnswer1').append("One word only, must be at least 4 characters");
			}
			else{
				missingField = false;
				$('#secretAnswerText1').empty();
				$('#secretAnswerText1').append('Secret Question*');
			}
		}
		
		if($('#fname1').val() === ''){
			missingField = false;
			$('#fnameText1').empty();
			$('#fnameText1').append('First Name:*');
		}else {
			fname = $('#fname1').val();
			$('#fnameText1').empty();
			$('#fnameText1').append('First Name:');
		}

		if($('#lname1').val() === ''){
			missingField = false;
			$('#lnameText1').empty();
			$('#lnameText1').append('Last Name:*');
		}else {
			lname = $('#lname1').val();
			$('#lnameText1').empty();
			$('#lnameText1').append('Last Name:');
		}

		if($('#email1').val() === ''){
			missingField = false;
			$('#emailText1').empty();
			$('#emailText1').append('Email:*');
		}else {
			email = $('#email1').val();
			if(validateEmail(email)){
				$('#emailText1').empty();
				$('#emailText1').append('Email: ');
				console.log(email);
				console.log('valid email');
			} else {
				missingField = false;
				$('#emailText1').empty();
				$('#emailText1').append('Email:* Enter Valid Email');
			}
		}

		if($('#password1').val() === ''){
			missingField = false;
			$('#passwordText1').empty();
			$('#passwordText1').append('Password:*');
		}else {
			password = $('#password1').val();
			$('#passwordText1').empty();
			$('#passwordText1').append('Password:');
		}

		if($('#passwordType1').val() === ''){
			missingField = false;
			$('#repasswordText1').empty();
			$('#repasswordText1').append('Retype-Password*');
		}else {
			passwordType = $('#passwordType1').val();
			checkPassword(passwordType); 
		}
			
			if($('#occupation').val() === ''){
			missingField = false;
			$('#occupationText').empty();
			$('#occupationText').append('Occupation *');
		}else {
			occupation = $('#occupation').val();
			$('#occupationText').empty();
			$('#occupationText').append('Occupation');
		}
		

		SectionmissingField(missingField);

	});
	
	$('#forgotPassword').click(function(){
		var forgotsecretAnswer;
		var tempEmail;
		var passFail =true;
		var newpass;
		console.log($('#forgotemail').val());
		if($('#forgotemail').val() === ''){
			
			$('#forgotemailText').empty();
			$('#forgotemailText').append('Email:*');
		}else {
			tempEmail = $('#forgotemail').val();
			if(validateEmail(tempEmail)){
				
				$('#forgotemailText').empty();
				$('#forgotemailText').append('Email: ');
				console.log(tempEmail);
				console.log('valid email');
			} else {
				
				$('#forgotemailText').empty();
				$('#forgotemailText').append('Email:* Enter Valid Email');
			}
		}
	if($('#forgotsecretAnswer').val() === ''){
			passFail = false;
			$('#forgotsecretAnswerText').empty();
			$('#forgotsecretAnswerText').append('Secret Question *');
		}else {
			forgotsecretAnswer = $('#forgotsecretAnswer').val();
			$('#forgotsecretAnswerText').empty();
			$('#forgotsecretAnswerText').append('Secret Question');
		}
		
		if($('#forgotnewpassword').val() === ''){
			passFail = false;
			$('#forgotnewpasswordText').empty();
			$('#forgotnewpasswordText').append('Retype-Password:*');
		}else {
				 newpass = $('#forgotnewpassword').val();
			//checkPassword(newpass); 
		}
		
		
		if(validatePassword(newpass) && passFail){
		
		
		forgotnewpassword
		console.log(newpass + forgotsecretAnswer)
		
		var passInfo = {'email': tempEmail, 'secretAnswer': forgotsecretAnswer, 'password':newpass}; 
		$.post("/resetPass", passInfo, function(data){
				//PostInformation(data);
				// console.log('/signup called');
				window.location = 'index';
			});
			}
			else{

				$('#forgotnewpasswordText').empty();
				$('#forgotnewpasswordText').append('Retype-Password:*');
				console.log("Error");
			
			}
	});
	
};

$(document).ready(main);

//http://jshint.com/
//configure enable jquery


























