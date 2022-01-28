
//changepassword dialog
function changepassworddlg() {
    var modal = setactiveModal('passworddlg.html');
    
	if ( modal === null) {
		return;
	}
	
    getById('password_loader').style.display = "none";
    getById('change_password_content').style.display = "block";
    getById('change_password_btn').style.display = "none";
    getById('password_content').innerHTML = "";
    getById('password_password_text').innerHTML ="";
    getById('password_password_text1').innerHTML ="";
    getById('password_password_text2').innerHTML ="";
    showModal() ;
}


function checkpassword(){
    var pwd = getById('password_password_text').value.trim();
    var pwd1 = getById('password_password_text1').value.trim();
    var pwd2 = getById('password_password_text2').value.trim();
    getById('password_content').innerHTML ="";
    getById('change_password_btn').style.display = "none";
    
	if (pwd1 != pwd2) {
		getById('password_content').innerHTML = translate_text_item("Passwords do not matches!"); 
	}else if (pwd1.length <1 || pwd1.length > 16 ||  pwd1.indexOf(" ")> -1 ){ 
	   getById('password_content').innerHTML = translate_text_item("Password must be >1 and <16 without space!");
    }else{ 
	   getById('change_password_btn').style.display = "block";
	}
}


function ChangePasswordfailed(errorcode, response_text){
      var response = JSON.parse(response_text);
	  
      if (typeof(response.status ) !== 'undefined' ){
		  getById('password_content').innerHTML = translate_text_item(response.status);
	  }
		  
	  console.log("Error " + errorcode + " : " + response_text);
      getById('password_loader').style.display = "none";
      getById('change_password_content').style.display = "block";
}

function ChangePasswordsuccess(response_text){
    getById('password_loader').style.display = "none";
    closeModal("Connection successful");
}

function SubmitChangePassword() {
	var url = "";
    var user = getById('current_ID').innerHTML.trim();
    var password = getById('password_password_text').value.trim();
    var newpassword = getById('password_password_text1').value.trim();
		
	//MIRKO
	if (!remove) {
	  url = esp32_address + "/login?USER="+encodeURIComponent(user) + "&PASSWORD=" + encodeURIComponent(password) + "&NEWPASSWORD=" + encodeURIComponent(newpassword) +"&SUBMIT=yes" ;
	}else{
	  url = "/login?USER="+encodeURIComponent(user) + "&PASSWORD=" + encodeURIComponent(password) + "&NEWPASSWORD=" + encodeURIComponent(newpassword) +"&SUBMIT=yes" ;
	}
	
	getById('password_loader').style.display = "block";
    getById('change_password_content').style.display = "none";
    SendGetHttp(url, ChangePasswordsuccess, ChangePasswordfailed);
}
