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

	function SectionmissingField(version){
			regInfo = {'firstName': fname, 
						'lastName': lname, 
							'email': email, 
							'secretAnswer': secretAnswer, 
							'secretQuestion': secretQuestion, 
							'password': password, 
							'occupation':occupation, 
							'vip':'0'};

			$.post("/signup", regInfo, function(status){
				if(status.url){
					window.location = 'profile';
				}else{
					if(version === 'vip'){
						$('#signVipMessage').empty();
						$('#signVipMessage').append(status.message);
					} else {
						$('#signMessage').empty();
						$('#signMessage').append(status.message);
					}
				}

			});
	}

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
					$('#logMessage').empty(); //for when user does not fill fields properly
					$('#logMessage').append(status.message);
				}
			});
		}
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

		if(!missingField){
			$('#fillSection').empty(); //for when user does nor fill fields properly
			$('#fillSection').append('Please fill in area(s) with *.');
		}else{
					SectionmissingField('regular');
		}

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
			$('#emailText1').append('User Name:*');
		}else {
			email = $('#email1').val();
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
		

		if(!missingField){
			$('#fillVipSection').empty(); //for when user does nor fill fields properly
			$('#fillVipSection').append('Please fill in area(s) with *.');
		}else{
			SectionmissingField('vip');
		}

	});
	
	$('#forgotPassword').click(function(){
		var forgotsecretAnswer;
		var tempEmail;
		var passFail =true;
		var passFill = true;
		var newpass;
		console.log($('#forgotemail').val());
		if($('#forgotemail').val() === ''){
			$('#forgotemailText').empty();
			$('#forgotemailText').append('User Name:*');
			passFill = false;
		}else {
			tempEmail = $('#forgotemail').val();
		}

		if($('#forgotsecretAnswer').val() === ''){
			passFail = false;
			passFill = false;
			$('#forgotsecretAnswerText').empty();
			$('#forgotsecretAnswerText').append('Secret Question *');
		}else {
			forgotsecretAnswer = $('#forgotsecretAnswer').val();
			$('#forgotsecretAnswerText').empty();
			$('#forgotsecretAnswerText').append('Secret Question');
		}
		
		if($('#forgotnewpassword').val() === ''){
			passFail = false;
			passFill = false;
			$('#forgotnewpasswordText').empty();
			$('#forgotnewpasswordText').append('Retype-Password:*');
		}else {
			 newpass = $('#forgotnewpassword').val();
		}
		
		if(passFill){
			$('#passFill').empty();
		} else {
			$('#passFill').empty();
			$('#passFill').append('Please fill in area(s) with *.');
		}
		
		if(validatePassword(newpass) && passFail){
			var passInfo = {'email': tempEmail, 'secretAnswer': forgotsecretAnswer, 'password':newpass}; 
			$.post("/resetPass", passInfo, function(data){
				if(data.change){
					$('#forgotemail').val('');
					$('#forgotsecretAnswer').val('');
					$('#forgotnewpassword').val(''); 
					$( '#success' ).trigger( "click" );
				} else{
					$('#notFound').empty();
					$('#notFound').append(data.message);

				}
			});

		} else {
				$('#forgotnewpasswordText').empty();
				$('#forgotnewpasswordText').append('Retype-Password:*');
		}
	});
	
};

$(document).ready(main);

//http://jshint.com/
//configure enable jquery


























