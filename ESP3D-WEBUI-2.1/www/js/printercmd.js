function SendPrinterCommand (cmd, echo_on, processfn, errorfn, id, max_id){
	//MIRKO
    var url = "";
	
	
	if (!remove) {
	  url = esp32_address + "/command?commandText=";
	}else{
	  url = "/command?commandText=";
	}
	
	
    var push_cmd = true;
	
    if (typeof echo_on !== 'undefined') {
        push_cmd = echo_on;
    }
	
    if (cmd.trim().length == 0) {
		return;
	}
	
	
    if (push_cmd){
		Monitor_output_Update("[#]"+cmd + "\n");
	}
	
	
    if (typeof processfn === 'undefined' || processfn == null) {
		processfn = SendPrinterCommandSuccess;
	}
	
    if (typeof errorfn === 'undefined' || errorfn ==null){
		errorfn = SendPrinterCommandFailed;
	}
	
    cmd = encodeURI(cmd);
    cmd = cmd.replace("#","%23");
    SendGetHttp(url + cmd, processfn, errorfn, id, max_id);
    //console.log(cmd);
}


function SendPrinterSilentCommand(cmd, processfn, errorfn, id, max_id){
	var url = "";
	
	if (!remove) {
	  url = esp32_address + "/command_silent?commandText=";
	}else{
	  url = "/command_silent?commandText=";
	}
	
    if (cmd.trim().length == 0) {
		return;
	}   		
			
    if (typeof processfn === 'undefined' || processfn == null) {
		processfn = SendPrinterSilentCommandSuccess;
	}
	
    if (typeof errorfn === 'undefined' || errorfn == null){ 
		errorfn = SendPrinterCommandFailed;
	}
	
    cmd = encodeURI(cmd);
    cmd = cmd.replace("#","%23");
    SendGetHttp(url + cmd, processfn, errorfn, id, max_id);
    //console.log(cmd);
}


function SendPrinterSilentCommandSuccess(response){
    //console.log(response);
}

function SendPrinterCommandSuccess(response){	
    if ((target_firmware == "grbl") || (target_firmware == "grbl-embedded")) {
		return;
	}
    if (response[response.length-1] != '\n'){
		Monitor_output_Update(response + "\n");	
    }else{
		Monitor_output_Update(response);
	}
}

function SendPrinterCommandFailed(error_code,response){
     Monitor_output_Update("Error " + error_code + " :" + decode_entitie(response)+ "\n");
     console.log("Error " + error_code + " :" + decode_entitie(response));
}










// TODO: da spostare in file esp32cmd.js
function SendESP32Command(cmd, echo_on, processfn, errorfn, id, max_id){
    var url = "";
	
	if (!remove) {
		url = esp32_address + "/command?plain=" + encodeURIComponent(cmd);
	}else{
		url = "/command?plain=" + encodeURIComponent(cmd);	
    }
	
    if (typeof processfn === 'undefined' || processfn == null) {
		processfn = SendESP32CommandSuccess;
    }
	
	if (typeof errorfn === 'undefined' || errorfn ==null){
		errorfn = SendESP32CommandFailed;
	}
	
	
	console.log('url:' + url);
	
	SendGetHttp(url, processfn, errorfn);	 
}


function SendESP32CommandSuccess(response){    
	console.log("Response " + decode_entitie(response));
}

function SendESP32CommandFailed(error_code,response){  
     console.log("Error " + error_code + " :" + decode_entitie(response));
}
