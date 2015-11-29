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
	function geoTest() {
 
    $.get("http://ipinfo.io", function (response) {
    $("#ip").html("IP: " + response.ip);
   
    city = response.city;
   console.log(city);
   var loc = {"city": city, "username": "frankthetank"};
   $.post("profile/Location", loc, function(data){
				console.log(data);
				
				//console.log(data[0]+" "+data[1] + "hist");
				getImage(data);
				callText();
				
			});
}, "jsonp");


}
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

























