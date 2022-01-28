




function refresh_camera_url(){
	camera_refesh_interval_id= window.setInterval(function(){
	  camera_loadframe();
	}, 4000);
}



/*
function cameraformataddress() {
   var saddress = getById('camera_webaddress').value;
   var saddressl = saddress.trim().toLowerCase();
   saddress = saddress.trim();
   if (saddress.length > 0) {
       if ( !(saddressl.indexOf("https://") != -1 || saddressl.indexOf("http://") != -1 || saddressl.indexOf("rtp://") != -1 || saddressl.indexOf("rtps://") != -1 || saddressl.indexOf("rtp://") != -1 )) {
           saddress = "http://" + saddress;
       } 
   } 
   getById('camera_webaddress').value = saddress;
} 
*/


function camera_loadframe(){
	
	console.log('camera_loadframe');
	
    if(camera_address.length == 0) {		    
		getById('camera_content').src = ""; 
		getCameraIP();
    }else{	       
		getById('camera_content').src = camera_address;				      	
    } 	
}


/*
function camera_OnKeyUp(event){
    if (event.keyCode == 13) {
       camera_loadframe();
    }
    return true;
}
*/


/*
function camera_saveaddress(){
    //cameraformataddress();
    preferenceslist[0].camera_address = HTMLEncode(getById('camera_webaddress').value);
    SavePreferences(true);
}
*/


function camera_detachcam(){	
    getById('camera_content').src = "";   
}



/*
function camera_GetAddress(){
    if (typeof(preferenceslist[0].camera_address) !== 'undefined') {
		//TODO: deccommentare e verificare errore
        //getById('camera_webaddress').value = decode_entitie(preferenceslist[0].camera_address);
    }else {
	    getById('camera_webaddress').value = "";
	}   
}
*/




// Funzione e handler per acquisire IP Camera e valorizzare InputBox
function getCameraIP(){
 var command = "[ESP402]";
 event.preventDefault();
 getById('message').innerHTML = "Wait Please!";
 SendESP32Command(command, true, process_getCameraIPResponse);
}
function process_getCameraIPResponse(response){
	delay(function(){	
	
	  //getById('message').innerHTML = "http://" + response;	  
	  //camera_address = "http://" + response; 
	  
	  getById('message').innerHTML =  response;	  
	  camera_address =  response; 
	  
	  getById('camera_content').src = camera_address;	  
	}, 500 ); 
}



// Funzione e handler per acquisire IP Camera e valorizzare InputBox
/*
function getCameraIPAndApply(){
 var command = "[ESP402]";
 event.preventDefault();
 getById('preferences_camera_webaddress').value = "Wait Please!";
 SendESP32Command(command, true, process_CameraIPAndApplyResponse);
}
function process_CameraIPAndApplyResponse(response){
	delay(function(){	
	  getById('preferences_camera_webaddress').value = "http://" + response;	
	}, 500 ); 
}
*/


function getIP1(){
 var command = "[ESP403]";
 event.preventDefault();
 SendESP32Command(command, true, process_getIP1Response);
}
function process_getIP1Response(response){	  	
    light_webaddress = response;
	console.log('light_webaddress=' + light_webaddress);	
}



function getIP2(){
 var command = "[ESP404]";
 event.preventDefault();
 SendESP32Command(command, true, process_getIP2Response);
}
function process_getIP2Response(response){	
    panic_webaddress = response;	  
	console.log('panic_webaddress=' + panic_webaddress);
}



// Funzione e handler risposta per controllare luce
function SetStatusLight(){	
 var cur_status = getById("light_toggle").getAttribute('data-status'); 

 var requested_status = "";
 if (cur_status == "on"){
	 requested_status = "off";
 } 
 if (cur_status == "off"){
	 requested_status = "on";
 } 
 var command = "[ESP466]P=1" + " V=" + requested_status;
 SendESP32Command(command, true, process_LightResponse);
}
function process_LightResponse(response){
 response=response.trim();	
 if (response = 'ok'){
	//getById("light_toggle").setAttribute('data-status', requested_status);		
	//getById("light_control").setAttribute("fill", "yellow");	
	//document.getElementByClassName("ray").setAttribute("fill", "yellow");		    
	getById('bulb').setAttribute("fill", "yellow");	
	var raylist = document.getElementsByClassName("ray");
    for (var i = 0; i < raylist.length; i++) {
      raylist[i].setAttribute("fill", "yellow");
    }	
	GetStatusLight();	
 }
}



// Funzione e handler verificare stato luce
function GetStatusLight(){
 var command = "[ESP467]P=1";
 SendESP32Command(command, true, process_GetStatusLightResponse); 
}
function process_GetStatusLightResponse(response){
	response=response.trim();
	
	if (response == 'on'){	   	
		getById('bulb').setAttribute("fill", "yellow");	
		var raylist = document.getElementsByClassName("ray");
        for (var i = 0; i < raylist.length; i++) {
           raylist[i].setAttribute("fill", "yellow");
        }
        getById("light_toggle").setAttribute('data-status', 'on'); 		
	}
	
	if (response == 'off'){
		getById('bulb').setAttribute("fill", "black");	
		var raylist = document.getElementsByClassName("ray");
        for (var i = 0; i < raylist.length; i++) {
           raylist[i].setAttribute("fill", "black");
        }
		getById("light_toggle").setAttribute('data-status', 'off');
	}
	
	if (response == 'ko'){
		//getById("light_control").setAttribute("fill", "black");
	}
		
}



//Funzione e handler risposta per disattivare stampante
function SetStatusPrinter(){
 var cur_status = getById("printer_toggle").getAttribute('data-status'); 
 var requested_status = "";
 var message ="";
 if (cur_status == "on"){
	 requested_status = "off";
	 message = "Sei sicuro di voler spegnere la stampante?";
 } 
 if (cur_status == "off"){
	 requested_status = "on";
	 message = "Sei sicuro di voler accendere la stampante?";
 } 		
 var command = "[ESP466]P=2" + " V=" + requested_status;
 var r = confirm(message);
 if (r == true) {	
   SendESP32Command(command, true, process_SetStatusPrinterResponse);
 } 
}
function process_SetStatusPrinterResponse(response){
 response=response.trim();	
 if (response = 'ok'){  
  getById('printer_control').setAttribute("fill", "yellow");	
  //var raylist = document.getElementsByClassName("ray");
  //for (var i = 0; i < raylist.length; i++) {
     //raylist[i].setAttribute("fill", "yellow");
  //}	
  GetStatusPrinter();	
 }
}





function GetStatusPrinter(){	
 var command = "[ESP467]P=2" ;
 SendESP32Command(command, true, process_GetStatusPrinterResponse); 
}
function process_GetStatusPrinterResponse(response){
	response=response.trim();
	
	if (response == 'on'){	   
		getById('printer_control').setAttribute("fill", "green");	
		//var raylist = document.getElementsByClassName("ray");
        //for (var i = 0; i < raylist.length; i++) {
           //raylist[i].setAttribute("fill", "yellow");
        //}
        getById("printer_toggle").setAttribute('data-status', 'on'); 		
	}
	
	if (response == 'off'){		
		getById('printer_control').setAttribute("fill", "red");	
		//var raylist = document.getElementsByClassName("ray");
        //for (var i = 0; i < raylist.length; i++) {
           //raylist[i].setAttribute("fill", "black");
        //}
		getById("printer_toggle").setAttribute('data-status', 'off');
	}
	
	if (response == 'ko'){
		//getById("printer_toggle").setAttribute('data-fruit', 'ko')
	}
		
}





//Funzione e handler risposta per fermare la stampa
function StopPrinting(){
 var command = "M112";
 var r = confirm("Sei sicuro di voler interrompere la stampa?");
 if (r == true) {	
   SendPrinterCommand(command, true, process_StopPrintingResponse);
 }
}
function process_StopPrintingResponse(response){
 //TODO: modificare icona result =  OK
 //alert(response);
 //document.getElementsByClassName("st1").setAttribute("fill", "black");
}






function HandleButtonVisibility(){
	
var x = document.getElementById("light_toggle");
var x1 = document.getElementById("printer_toggle");


if (typeof(light_webaddress) !== 'undefined' &&  light_webaddress.length != 0) {   
 x.style.display = "block";
 GetStatusLight();
}else {
 x.style.display = "none";
}


if (typeof(panic_webaddress) !== 'undefined' && panic_webaddress.length != 0) {   
 x1.style.display = "block";
 GetStatusPrinter();
}else {
 x1.style.display = "none";
}
		
}











