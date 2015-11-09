var main = function() {
	var college, 
		major, 
		course,
		subject,
		message,
		email,
		missingField,
		$content;

	//makes sure that the fields have a valid input and fowards content to server
	function SectionmissingField(check){
		console.log('checking fields');
		if(check === false){
			$('#fillSection').empty(); //for when user does nor fill fields properly
			$('#fillSection').append('Please fill in area(s) with *.');
		} else {
			console.log('Inputs are complete');
			PostInformation();
		}
	}

	//going to suppy information to sql server 
	function PostInformation () {
		console.log('suppose to empty');
		$('#submitForm').empty();
		$('#submitForm').append($('<p class="text-center">').text('Your infomation that you entered:'));

		$content = $('<ul class="text-center">');
		$content.append($('<li>').text('college: ' + college));
		$content.append($('<li>').text('major '+ major));
		$content.append($('<li>').text('course: '+ course));
		$content.append($('<li>').text('subject: '+ subject));
		$content.append($('<li>').text('email: '+ email));
		$content.append($('<li>').text('message: '+ message));

		$('#submitForm').append($content);
	}


	//http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	//check to see if its a valid email
	function validateEmail(email) {
    	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	return re.test(email);
	}


	//checks that all the fields have an input by user
	$('#button').click(function(){
		//alert('button press');
		missingField = true;
		console.log('button press');
		if ($('#colleges').val() === 'college')
		{
			missingField = false;
			console.log('Select a college');
			// alert('Select a college');
			$('#collegeOption').empty();
			$('#collegeOption').append('College*');
		}else{
			college = $('#colleges').val();
			$('#collegeOption').empty();
			$('#collegeOption').append('College');
		} 

		if ($('#major').val() === 'major'){
			missingField = false;
			console.log('Select a major');
			$('#majorOption').empty();
			$('#majorOption').append('Major*');
		} else{
			major = $('#major').val();
			$('#majorOption').empty();
			$('#majorOption').append('Major');
		}

		if($('#course').val() === 'course'){
			missingField = false;
			console.log('Select class');
			$('#courseOption').empty();
			$('#courseOption').append('Course*');
		} else {
			course = $('#course').val();
			$('#courseOption').empty();
			$('#courseOption').append('Course');
		}
		
		if($('#subject').val() === ''){
			missingField = false;
			$('#subjectTitle').empty();
			$('#subjectTitle').append('Subject:*');
		} else {
			subject = $('#subject').val();
		    $('#subjectTitle').empty();
			$('#subjectTitle').append('Subject:');
		}

		if($('#email').val() !== ''){
			email = $('#email').val();
			if(validateEmail(email)){
				$('#emailTitle').empty();
				$('#emailTitle').append('Email(optional):');
				console.log(email);
				console.log('Email is correct & Saved');
			}
			else{
				console.log('Enter a valid email');
				missingField = false;
				email = '';
				$('#emailTitle').empty();
				$('#emailTitle').append('Email(optional):*Enter valid email or leave blank');
			}
		} else{
			email = '';
			$('#emailTitle').empty();
			$('#emailTitle').append('Email(optional):');
		}

		if (!$.trim($("#message").val())) {
    		// textarea is empty or contains only white-space
    		missingField = false;
    		console.log('Empty text body');
    		$('#messageTitle').empty();
			$('#messageTitle').append('Message:*');
		}
		else{
			message = $.trim($("#message").val());
			$('#messageTitle').empty();
			$('#messageTitle').append('Message:');
		}

		SectionmissingField(missingField);

	});
};

$(document).ready(main);




























