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
	getLocation();
	
	  function getLocation() {
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
      }
      }
      function showPosition(position) {
      var latlon = position.coords.latitude + "," + position.coords.longitude;
      codeLatLng(position.coords.latitude, position.coords.longitude)
      var w = window.innerWidth;
      var h = window.innerHeight;
      var scale = 2
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      scale = 1
      }
      var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
      +latlon+"&markers="+latlon+"&zoom=13&size="+w+"x"+h+"&scale="+scale+"&sensor=false";
      //document.getElementById("introLoader").style.class = "test";
      var c = document.getElementsByClassName("intro");
      c[0].style.backgroundImage="url('"+img_url+"')";
      }
      
      function codeLatLng(lat, lng) {
 var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
     geocoder.geocode({'location': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
       //  city= results[0].address_components[3];
         //document.getElementById("hello").innerHTML = city.short_name + " " + city.long_name;
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {
//console.log(results[0].address_components[i].types[b]);
//console.log(results[0].address_components[i]);
            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "locality") {
                    //this is the object you are looking for
                    city = results[0].address_components[i]
                    console.log(city.short_name+"THID")
                   var loc = {"city": city.short_name, "username": "frankthetank"};
                    $.post("profile/Location", loc, function(data){
				console.log(data);
				
				//console.log(data[0]+" "+data[1] + "hist");
				getImage(data);
				callText();
				
			});
                    break;
                }
            }
        }
        //city data
       


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }
      function showError(error) {
      switch(error.code) {
      case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
      case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
      case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
      case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
      }
      }
	// function geoTest() {
//  
//     $.get("http://ipinfo.io", function (response) {
//     $("#ip").html("IP: " + response.ip);
//    
//     city = response.city;
//    console.log(city);
//    var loc = {"city": city, "username": "frankthetank"};
//    $.post("profile/Location", loc, function(data){
// 				console.log(data);
// 				
// 				//console.log(data[0]+" "+data[1] + "hist");
// 				getImage(data);
// 				callText();
// 				
// 			});
// }, "jsonp");
// 
// 
// }
	/*
	
      var fileextension = ".jpg";
      var fileExt = {};
      fileExt[0]=".gif";
      fileExt[1]=".jpg";
      var dir = "root/hello/uploads";
      $.ajax({
      //This will retrieve the contents of the folder if the folder is configured as 'bro$
      url:dir,
      success: function (data) {
      //$("#row").html('');
      //List all png or jpg or gif file names in the page
      $(data).find("a:contains(" + fileExt[0] + "),a:contains(" + fileExt[1] + ")").each($
      var filename = this.href.replace(window.location.host, "").replace("http://", "");
      console.log(filename);

      var path = dir+filename;
      console.log(path+"Path");
      path = path.replace(":3000","");

      $("#row").append('<div class="col-sm-4 fadeInUp wowload"><div class="gallery-items"$
      // $("#row").append( "<img class='img-responsive' src='"+path+ "'alt=item01'/>");
      // $("#row").append('<div class="caption"><h3>'+filename+'</h3> <a href="'+path+'" $
      });
      }
      });
      }*/
      
function callText(){
 console.log("!ere");
 
     $.post("profile/getText",function(data){
				//console.log(data);
				
			
				getText(data);
			
				
			}); 
			
}


function getText(data){
    var count = 0;
    $.each(data, function (i,message){
    //console.log(message);
        if(message.alert=="Y"){
        console.log(message.text.length );
            if(message.text.length > 200){
                $("#text").append('<div class="tile tileLarge white wordwrap">'+message.text+'</div>');
                
            }
            else{
                $("#text").append('<div class="tile white wordwrap">'+message.text+'</div>');
                

            }
        }
            
        else{
            if(message.text.length > 200){
                $("#row").append('<div class="tile tileLarge white wordwrap">'+message.text+'</div>');
               
            }
            else{
                $("#row").append('<div class="tile white wordwrap">'+message.text+'</div>');
               

            }
        }
    });


}
function getImage(data)
      {
            //	console.log(city);
      	$.each(data, function (i,folder){
      	
      	//console.log(folder);
      	
      	
      	// console.log("Folder "+folder);     	
//       	console.log("FF");
      	
      	
      	
      	
      	var dir = "root/hello/uploads/"+folder;
      	console.log(dir);
      	var fileExt = {};
      	var appendString = "";
      	fileExt[0]=".mp4";
      	fileExt[1]=".jpg";
      	fileExt[2]=".gif";
      	
      	$.ajax({
      //This will retrieve the contents of the folder if the folder is configured as 'browsable'
      		url: dir,
      		success: function (data) {
      //$("#row").html('');
      //List all png or jpg or gif file names in the page
      		$(data).find("a:contains(" + fileExt[0] + "),a:contains(" + fileExt[1] + "),a:contains("+fileExt[2]+")").each(function () {
      		var filename = this.href.replace(window.location.host, "").replace("http://", "");
      		console.log(filename);
      		filename = filename.replace("/myapp/","");
      		var path = dir+filename;
      		if(getFileExtension(filename) == "gif" || getFileExtension(filename) == "jpg"){
      			appendString = '<div class="col-sm-4 fadeInUp wowload"><div class="gallery-items">'+"<img class='img-responsive' src='"+path+ "'alt=item01'/>"+'<div class="caption"><h3>'+filename+'</h3> <a href="'+path+'" title="Digial Agency" class="gallery-image btn btn-default" data-gallery>View Details</a></div></div></div>';
      		}
      		else if(getFileExtension(filename) == "mp4"){
      			appendString = '<div class="col-sm-4 fadeInUp wowload"><div class="gallery-items">' + '<video width="320" height="240" controls><source src="'+path+'"></video>';
      		}
      		
      		$("#row").append(appendString);
      // $("#row").append( "<img class='img-responsive' src='"+path+ "'alt=item01'/>");
      // $("#row").append('<div class="caption"><h3>'+filename+'</h3> <a href="'+path+'" title="Digial Agency" class="gallery-image btn btn-default" data-gallery>View Details</a></div></div></div>');
      		});
      		}
      		});
      		
      		
      		
      		})
      }

	

	function getFileExtension(filename) {
		return filename.split('.').pop();
	}
};



$(document).ready(main);

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
  document.body.appendChild(script);
  console.log("H");
}


//http://jshint.com/
//configure enable jquery

























