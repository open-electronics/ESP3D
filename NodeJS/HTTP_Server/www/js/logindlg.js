//login dialog
function logindlg(closefunc, check_first) {
	var url = "";
    var modal = setactiveModal('logindlg.html',closefunc);
    var need_query_auth = false;
	
    if ( modal === null){
		return;
	} 
	
    getById('login_title').innerHTML = translate_text_item("Identification requested") ;
    getById('login_loader').style.display = "none";
    getById('login_content').style.display = "block";
    if (typeof check_first !== 'undefined')need_query_auth = check_first;
	
    if (need_query_auth) {
	     
	    //MIRKO
	   if (!remove) {
		  url = "/login";
	   }else{
		  url = esp32_address + "/login";
	   }
	      
       SendGetHttp(url, checkloginsuccess);
		
    }else{
        showModal() ;
    }
	
}


function checkloginsuccess(response_text){
    var response = JSON.parse(response_text);
	
      if (typeof(response.authentication_lvl ) !== 'undefined' ) {
		  
          if ( response.authentication_lvl != "guest") {
			  
               if (typeof(response.authentication_lvl ) !== 'undefined' ){
				    getById('current_auth_level').innerHTML = "(" +  translate_text_item(response.authentication_lvl) + ")";
			   }
				  	   
               if (typeof(response.user ) !== 'undefined' ){
				   getById('current_ID').innerHTML =  response.user ;
			   }
				      
               closeModal('cancel');
			  
         }else{
			 showModal();
		 }
		  
      }else{
           showModal() ;
      }
}


function login_id_OnKeyUp(event) {
    //console.log(event.keyCode);
    if ((event.keyCode == 13) ) {
		getById('login_password_text').focus();
	}
	
}


function login_password_OnKeyUp(event) {
    //console.log(event.keyCode);
    if ((event.keyCode == 13)){
		getById('login_submit_btn').click();
	} 
}


function loginfailed(errorcode, response_text){
      var response = JSON.parse(response_text);
	  
      if (typeof(response.status ) !== 'undefined' ){
		  getById('login_title').innerHTML = translate_text_item(response.status);
	  }else{
		  getById('login_title').innerHTML = translate_text_item("Identification invalid!");
      }
	  console.log("Error " + errorcode + " : " + response_text);
      getById('login_content').style.display = "block";
      getById('login_loader').style.display = "none";
      getById('current_ID').innerHTML = translate_text_item("guest"); 
      getById('logout_menu').style.display = "none";
      getById('logout_menu_divider').style.display = "none";
      getById("password_menu").style.display = "none";
}

function loginsuccess(response_text){
    var response = JSON.parse(response_text);
	
    if (typeof(response.authentication_lvl ) !== 'undefined' ){
		getById('current_auth_level').innerHTML = "(" +  translate_text_item(response.authentication_lvl) + ")";
	}
    getById('login_loader').style.display = "none";
    getById('logout_menu').style.display = "block";
    getById('logout_menu_divider').style.display = "block";
    getById("password_menu").style.display = "block";
    closeModal("Connection successful");
}

function SubmitLogin() {
	var url ="";
    var user = getById('login_user_text').value.trim();
    var password = getById('login_password_text').value.trim();
	
	//MIRKO
	if (!remove) {
	  url = esp32_address + "/login?USER="+encodeURIComponent(user) + "&PASSWORD=" + encodeURIComponent(password) + "&SUBMIT=yes" ;
	}else{
	  url = "/login?USER=" + encodeURIComponent(user) + "&PASSWORD=" + encodeURIComponent(password) + "&SUBMIT=yes" ;
	}
	
	
    getById('current_ID').innerHTML = user; 
    getById('current_auth_level').innerHTML = "";
    getById('login_content').style.display = "none";
    getById('login_loader').style.display = "block";
    SendGetHttp(url, loginsuccess, loginfailed);
}

function GetIdentificationStatus(){
	var url ="";
	
	//MIRKO
	if (!remove) {
	  url = esp32_address + "/login";
	}else{
	  url = "/login" ;
	}
	
    SendGetHttp(url, GetIdentificationStatusSuccess);
}
   
   
function GetIdentificationStatusSuccess(response_text){
    var response = JSON.parse(response_text);
	
    if (typeof(response.authentication_lvl ) !== 'undefined' ) {	
        if (response.authentication_lvl == "guest") {
          getById('current_ID').innerHTML = translate_text_item("guest"); 
          getById('current_auth_level').innerHTML = "";
        } 
    }
}

function DisconnectionSuccess(response_text) {
    getById('current_ID').innerHTML = translate_text_item("guest"); 
    getById('current_auth_level').innerHTML = "";
    getById('logout_menu').style.display = "none";
    getById('logout_menu_divider').style.display = "none";
    getById("password_menu").style.display = "none";
}

function DisconnectionFailed(errorcode, response) {
    getById('current_ID').innerHTML = translate_text_item("guest"); 
    getById('current_auth_level').innerHTML = "";
    getById('logout_menu').style.display = "none";
    getById('logout_menu_divider').style.display = "none";
    getById("password_menu").style.display = "none";
    console.log("Error " + errorcode + " : " + response);
}
   
   
function DisconnectLogin(answer) {
	 var url ="";
	  
     if (answer == "yes") {
		 
		//MIRKO
		if (!remove) {
		 url = sp32_address + "/login?DISCONNECT=yes";
		}else{
		  url = "/login?DISCONNECT=yes";
		}
		
        SendGetHttp(url, DisconnectionSuccess, DisconnectionFailed);
    }
 }  
