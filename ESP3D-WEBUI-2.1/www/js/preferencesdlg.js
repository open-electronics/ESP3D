//Preferences dialog
var language = "it";

var preferenceslist = [];
var language_save = language;
var default_preferenceslist = [];
var preferences_file_name = '/preferences.json';

var defaultpreferenceslist = "[{\
\"language\":\"en\",\
\"enable_lock_UI\":\"false\",\
\"enable_ping\":\"true\",\
\"enable_DHT\":\"false\",\
\"enable_camera\":\"true\",\
\"number_extruders\":\"1\",\
\"is_mixed_extruder\":\"false\",\
\"enable_redundant\":\"false\",\
\"enable_probe\":\"false\",\
\"enable_bed\":\"false\",\
\"enable_chamber\":\"false\",\
\"enable_fan\":\"false\",\
\"enable_z\":\"true\",\
\"enable_control_panel\":\"true\",\
\"enable_grbl_panel\":\"false\",\
\"interval_positions\":\"3\",\
\"interval_temperatures\":\"3\",\
\"interval_status\":\"3\",\
\"xy_feedrate\":\"1000\",\
\"z_feedrate\":\"100\",\
\"a_feedrate\":\"100\",\
\"b_feedrate\":\"100\",\
\"c_feedrate\":\"100\",\
\"e_feedrate\":\"400\",\
\"e_distance\":\"5\",\
\"f_filters\":\"gco;gcode\",\
\"enable_temperatures_panel\":\"true\",\
\"enable_extruder_panel\":\"true\",\
\"enable_files_panel\":\"true\",\
\"has_TFT_SD\":\"false\",\
\"has_TFT_USB\":\"false\",\
\"enable_commands_panel\":\"true\",\
\"enable_autoscroll\":\"true\",\
\"enable_verbose_mode\":\"true\",\
\"enable_grbl_probe_panel\":\"false\",\
\"probemaxtravel\":\"40\",\
\"probefeedrate\":\"100\",\
\"probetouchplatethickness\":\"0.5\"\
}]";
		
		


function initpreferences() {

if ((target_firmware == "grbl-embedded") || (target_firmware == "grbl")) {	
	
defaultpreferenceslist = "[{\
\"language\":\"en\",\
\"enable_lock_UI\":\"false\",\
\"enable_ping\":\"true\",\
\"enable_DHT\":\"false\",\
\"enable_camera\":\"true\",\
\"number_extruders\":\"1\",\
\"is_mixed_extruder\":\"false\",\
\"enable_redundant\":\"false\",\
\"enable_probe\":\"false\",\
\"enable_bed\":\"false\",\
\"enable_chamber\":\"false\",\
\"enable_fan\":\"false\",\
\"enable_z\":\"true\",\
\"enable_control_panel\":\"true\",\
\"enable_grbl_panel\":\"true\",\
\"interval_positions\":\"3\",\
\"interval_temperatures\":\"3\",\
\"interval_status\":\"3\",\
\"xy_feedrate\":\"1000\",\
\"z_feedrate\":\"100\",\
\"a_feedrate\":\"100\",\
\"b_feedrate\":\"100\",\
\"c_feedrate\":\"100\",\
\"e_feedrate\":\"400\",\
\"e_distance\":\"5\",\
\"enable_temperatures_panel\":\"false\",\
\"enable_extruder_panel\":\"false\",\
\"enable_files_panel\":\"true\",\
\"has_TFT_SD\":\"false\",\
\"has_TFT_USB\":\"false\",\
\"f_filters\":\"g;G;gco;GCO;gcode;GCODE;nc;NC;ngc;NCG;tap;TAP;txt;TXT\",\
\"enable_commands_panel\":\"true\",\
\"enable_autoscroll\":\"true\",\
\"enable_verbose_mode\":\"true\",\
\"enable_grbl_probe_panel\":\"false\",\
\"probemaxtravel\":\"40\",\
\"probefeedrate\":\"100\",\
\"probetouchplatethickness\":\"0.5\"\
}]";

getById('DHT_pref_panel').style.display = 'none';
		
getById('temp_pref_panel').style.display = 'none';
		
getById('ext_pref_panel').style.display = 'none';
		
getById('grbl_pref_panel').style.display = 'block';
		
getById('has_tft_sd').style.display = 'table-row';
		
getById('has_tft_usb').style.display = 'table-row';
											
} else {
		
defaultpreferenceslist = "[{\
\"language\":\"en\",\
\"enable_lock_UI\":\"false\",\
\"enable_ping\":\"true\",\
\"enable_DHT\":\"false\",\
\"enable_camera\":\"true\",\
\"number_extruders\":\"1\",\
\"is_mixed_extruder\":\"false\",\
\"enable_redundant\":\"false\",\
\"enable_probe\":\"false\",\
\"enable_bed\":\"false\",\
\"enable_chamber\":\"false\",\
\"enable_fan\":\"false\",\
\"enable_z\":\"true\",\
\"enable_control_panel\":\"true\",\
\"enable_grbl_panel\":\"true\",\
\"interval_positions\":\"3\",\
\"interval_temperatures\":\"3\",\
\"interval_status\":\"3\",\
\"xy_feedrate\":\"1000\",\
\"z_feedrate\":\"100\",\
\"a_feedrate\":\"100\",\
\"b_feedrate\":\"100\",\
\"c_feedrate\":\"100\",\
\"e_feedrate\":\"400\",\
\"e_distance\":\"5\",\
\"enable_temperatures_panel\":\"true\",\
\"enable_extruder_panel\":\"true\",\
\"enable_files_panel\":\"true\",\
\"has_TFT_SD\":\"false\",\
\"has_TFT_USB\":\"false\",\
\"f_filters\":\"g;G;gco;GCO;gcode;GCODE\",\
\"enable_commands_panel\":\"true\",\
\"enable_autoscroll\":\"true\",\
\"enable_verbose_mode\":\"true\",\
\"enable_grbl_probe_panel\":\"false\",\
\"probemaxtravel\":\"40\",\
\"probefeedrate\":\"100\",\
\"probetouchplatethickness\":\"0.5\"\
}]";

if (target_firmware == "marlin-embedded") {
	getById('DHT_pref_panel').style.display = 'none';	
}else{
   getById('DHT_pref_panel').style.display = 'block';
}

getById('temp_pref_panel').style.display = 'block';

getById('ext_pref_panel').style.display = 'block';

getById('grbl_pref_panel').style.display = 'none';

getById('has_tft_sd').style.display = 'table-row';

getById('has_tft_usb').style.display = 'table-row';
		
}
        
		
if (supportsRedundantTemperatures()) {
	getById('redundant_controls_option').style.display = 'block';
}else{
	getById('redundant_controls_option').style.display = 'none';
} 

if (supportsProbeTemperatures()){
   getById('probe_controls_option').style.display = 'block';	
}else{
	getById('probe_controls_option').style.display = 'none';
}

if (supportsChamberTemperatures()){
	getById('chamber_controls_option').style.display = 'block';
}else{
	getById('chamber_controls_option').style.display = 'none';
}

default_preferenceslist = JSON.parse(defaultpreferenceslist);

}







function getpreferenceslist() {
	//MIRKO	
	//TODO: verificare	
	
    var url = "";
	
	if (!remove) {
	  url = esp32_address  + preferences_file_name + "?" + Date.now();
	}else{
	  url = preferences_file_name + "?" + Date.now();
	}
		
	//alert (url);	
			
    preferenceslist = [];	   

    //TODO: verificare	Ho rimosso il commento in modo che vengano comunque presi i dati salvati su SPIFF dell' ESP32
    //removeIf(production)
    //var response = defaultpreferenceslist;
    //processPreferencesGetSuccess(response);
    //return;
    //endRemoveIf(production)
		
    SendGetHttp(url, processPreferencesGetSuccess, processPreferencesGetFailed);
	
}







var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();









function build_extruder_list(forcevalue) {
    var nb = 2
    var content = "";
    var current_value = getById('preferences_control_nb_extruders').value;
	
    if (getById('enable_mixed_E_controls').checked) {
        nb = 9;
    }
	
    if (typeof forcevalue != 'undefined') {
		nb = forcevalue;
	}
	
    for (var i = 1; i <= nb; i++) {
        content += "<option value='" + i + "'>" + i + "</option>";
    }
	
    getById('preferences_control_nb_extruders').innerHTML = content;
	
    if (parseInt(current_value) > nb) {
		current_value = 1;
	}
	
    getById('preferences_control_nb_extruders').value = current_value;
}




function prefs_toggledisplay(id_source, forcevalue) {
	
    if (typeof forcevalue != 'undefined') {
		if (getById(id_source) != null){
			getById(id_source).checked = forcevalue;
		}	
    }
	
    switch (id_source) {
        case 'show_files_panel':
		
            if (getById(id_source).checked) {
				getById("files_preferences").style.display = "block";
			}else{
				getById("files_preferences").style.display = "none";
			}	
            break;
			
        case 'show_grbl_panel':
            if (getById(id_source).checked) {
				getById("grbl_preferences").style.display = "block";
			}else {
				getById("grbl_preferences").style.display = "none";
			}		
            break;
			
        
			
        case 'show_control_panel':
            if (getById(id_source).checked) {
				getById("control_preferences").style.display = "block";
			}else{
				getById("control_preferences").style.display = "none";
			}
            break;
			
        case 'show_extruder_panel':
            if (getById(id_source).checked) {
				getById("extruder_preferences").style.display = "block";
			}else{
				getById("extruder_preferences").style.display = "none";
			}
            break;
			
        case 'show_temperatures_panel':
            if (getById(id_source).checked) {
				getById("temperatures_preferences").style.display = "block";
			}else{
				getById("temperatures_preferences").style.display = "none";
			}
            break;
			
        case 'show_commands_panel':
            if (getById(id_source).checked) {
				getById("cmd_preferences").style.display = "block";
			}else{
				getById("cmd_preferences").style.display = "none";
			}
            break;
			
        case 'show_grbl_probe_tab':
            if (getById(id_source).checked) {
				getById("grbl_probe_preferences").style.display = "block";
			}else{
				getById("grbl_probe_preferences").style.display = "none";
			}
            break;
    }
	
}



function processPreferencesGetSuccess(response) {
    if (response.indexOf("<HTML>") == -1) {
	    Preferences_build_list(response);	
	}else{
		Preferences_build_list(defaultpreferenceslist);
	}
}


function processPreferencesGetFailed(errorcode, response) {
    console.log("Error " + errorcode + " : " + response);
    Preferences_build_list(defaultpreferenceslist);
}




function Preferences_build_list(response_text) {
    preferenceslist = [];
    try {
		
        if (response_text.length != 0) {
			
            console.log("Loaded Preferences: " + response_text);  
			
            preferenceslist = JSON.parse(response_text);
			
        }else{
            preferenceslist = JSON.parse(defaultpreferenceslist);
        }
		
    } catch (e) {
        console.error("Parsing error:", e);
        preferenceslist = JSON.parse(defaultpreferenceslist);
    }
	
    applypreferenceslist();
	
}



function applypreferenceslist() {
	

 
   //Assign each control state
   translate_text(preferenceslist[0].language);
   
   build_HTML_setting_list(current_setting_filter);

	
  
    if (getById('camtab') != null) {
		
        var camoutput = false;
		
        if (typeof(preferenceslist[0].enable_camera) !== 'undefined') {
			
            if (preferenceslist[0].enable_camera === 'true') {	
                getById('camtablink').style.display = "block";				
                //camera_GetAddress();							 
                //camera_loadframe();
                camoutput = true;                     		
            }else{
                getById("maintablink").click();
                getById('camtablink').style.display = "none";
            }
			
        }else{
            getById("maintablink").click();
            getById('camtablink').style.display = "none";
        }
		
        if (!camoutput) {
            getById('camera_frame').src = "";
            getById('camera_frame_display').style.display = "none";
            
        }
    }
	
    if (preferenceslist[0].enable_grbl_probe_panel === 'true') {
        getById('grblprobetablink').style.display = 'block';
    }else{
        getById("grblcontroltablink").click();
        getById('grblprobetablink').style.display = 'none';
    }


    
    if (preferenceslist[0].enable_DHT === 'true') {	
		if (getById('DHT_humidity') != null) {
          getById('DHT_humidity').style.display = 'block';
          getById('DHT_temperature').style.display = 'block';
		}
    }else{
		if (getById('DHT_humidity') != null) {
         getById('DHT_humidity').style.display = 'none';
         getById('DHT_temperature').style.display = 'none';
	   }
    }
	
	
	
    //active_extruder
    if (preferenceslist[0].is_mixed_extruder === 'true') {
        getById('second_extruder_UI').style.display = 'none';
        getById('first_extruder_UI').style.display = 'none';
        getById('temperature_secondExtruder').style.display = 'none';
        getById('mixed_extruder_UI').style.display = 'block';
        temperature_second_extruder(false);
        var content = "";
        for (i = 0; i < preferenceslist[0].number_extruders; i++) {
            content += "<option value='" + i + "'>" + i + "</option>";
        }
        getById('active_extruder').innerHTML = content;
    }else{
        getById('first_extruder_UI').style.display = 'block';
        getById('mixed_extruder_UI').style.display = 'none';
		
        if (preferenceslist[0].number_extruders == '2') {
            getById('second_extruder_UI').style.display = 'block';
            getById('temperature_secondExtruder').style.display = 'table-row';
            temperature_second_extruder(true);
        }else{
            getById('second_extruder_UI').style.display = 'none';
            getById('temperature_secondExtruder').style.display = 'none';
            temperature_second_extruder(false);
        }
		
    }
	
    if (preferenceslist[0].enable_lock_UI === 'true') {
        getById('lock_ui_btn').style.display = 'block';
        ontoggleLock(true);
    }else{
        getById('lock_ui_btn').style.display = 'none';
        ontoggleLock(false);
    }
	
    if (preferenceslist[0].enable_ping === 'true') {
        ontogglePing(true);
    }else{
        ontogglePing(false);
    }

    if (supportsRedundantTemperatures()) {
        if (preferenceslist[0].enable_redundant === 'true') {
            getById('temperature_redundant').style.display = 'table-row';
            temperature_extruder_redundant(true);
        }else{
            getById('temperature_redundant').style.display = 'none';
            temperature_extruder_redundant(false);
        }
    }
	
    if (supportsProbeTemperatures()) {
        if (preferenceslist[0].enable_probe === 'true') {
            getById('temperature_probe').style.display = 'table-row';
            temperature_probe(true);
        }else{
            getById('temperature_probe').style.display = 'none';
            temperature_probe(false);
        }
    }
	
    if (preferenceslist[0].enable_bed === 'true') {
        getById('temperature_bed').style.display = 'table-row';
    }else{
        getById('temperature_bed').style.display = 'none';
    }
	
    if (supportsChamberTemperatures()) {
        if (preferenceslist[0].enable_chamber === 'true') {
            getById('temperature_chamber').style.display = 'table-row';
            temperature_chamber(true);
        }else{
            getById('temperature_chamber').style.display = 'none';
            temperature_chamber(false);
        }
    }

    if (preferenceslist[0].enable_bed === 'true' ||
            (preferenceslist[0].enable_chamber === 'true' && supportsChamberTemperatures()) ||
            (preferenceslist[0].enable_probe === 'true' && supportsProbeTemperatures())) {
        getById('bedtemperaturesgraphic').style.display = 'block';
    }else{
        getById('bedtemperaturesgraphic').style.display = 'none';
    }

    if (preferenceslist[0].enable_fan === 'true') {
		getById('fan_UI').style.display = 'block';
	}else{
		getById('fan_UI').style.display = 'none';
	}


    if ((target_firmware == "grbl-embedded") || (target_firmware == "grbl")) {
        if (preferenceslist[0].enable_grbl_panel === 'true'){
		  getById('grblPanel').style.display = 'flex';	
		}else{
            getById('grblPanel').style.display = 'none';
            on_autocheck_status(false);
        }
		
    }else{
        getById('grblPanel').style.display = 'none';
        on_autocheck_status(false);
    }


    if (preferenceslist[0].enable_control_panel === 'true') {
		getById('controlPanel').style.display = 'flex';
	}else{
        getById('controlPanel').style.display = 'none';
        on_autocheck_position(false);
    }
	
	
    if (preferenceslist[0].enable_verbose_mode === 'true') {
        getById('monitor_enable_verbose_mode').checked = true;
        Monitor_check_verbose_mode();
    }else{
		getById('monitor_enable_verbose_mode').checked = false;
	}
	
	
    if (preferenceslist[0].enable_temperatures_panel === 'true') {
        getById('temperaturesPanel').style.display = 'block';
    }else{
        getById('temperaturesPanel').style.display = 'none';
        on_autocheck_temperature(false);
    }


    if (preferenceslist[0].enable_extruder_panel === 'true') {
	   getById('extruderPanel').style.display = 'flex';	
	}else{
	   getById('extruderPanel').style.display = 'none';
	}


    if (preferenceslist[0].enable_files_panel === 'true') {
		getById('filesPanel').style.display = 'flex';
	}else{
		getById('filesPanel').style.display = 'none';
	}
		
    
	
    if (preferenceslist[0].has_TFT_SD === 'true'){
         getById('files_refresh_tft_sd_btn').style.display = 'flex';
    }else{
        getById('files_refresh_tft_sd_btn').style.display = 'none';
    }
    
	
    if (preferenceslist[0].has_TFT_USB === 'true') {
        getById('files_refresh_tft_usb_btn').style.display = 'flex';
    }else{
        getById('files_refresh_tft_usb_btn').style.display = 'none';
    }
    
	
    if ((preferenceslist[0].has_TFT_SD === 'true') || (preferenceslist[0].has_TFT_USB === 'true')){
        getById('files_refresh_printer_sd_btn').style.display = 'flex';
        getById('files_refresh_btn').style.display = 'none';
    }else{
        getById('files_refresh_printer_sd_btn').style.display = 'none';
        getById('files_refresh_btn').style.display = 'flex';
    }
    
	
    if(target_firmware == "grbl") {
         getById('files_refresh_printer_sd_btn').style.display = 'none';
         getById('files_refresh_btn').style.display = 'none';
         getById('print_upload_btn').style.display = 'none';
         getById('files_createdir_btn').style.display = "none";
    }

    if (preferenceslist[0].enable_commands_panel === 'true') {
		
        getById('commandsPanel').style.display = 'flex';
		
        if (preferenceslist[0].enable_autoscroll === 'true') {
            getById('monitor_enable_autoscroll').checked = true;
            Monitor_check_autoscroll();
        }else{
			getById('monitor_enable_autoscroll').checked = false;
		}
    
	}else{
		getById('commandsPanel').style.display = 'none';
	}


    getById('posInterval_check').value = parseInt(preferenceslist[0].interval_positions);
	
    getById('statusInterval_check').value = parseInt(preferenceslist[0].interval_status);
	
    getById('control_xy_velocity').value = parseInt(preferenceslist[0].xy_feedrate);
	
    getById('control_z_velocity').value = parseInt(preferenceslist[0].z_feedrate);
	
	
    if (target_firmware == "grbl-embedded"){
		
        if (grblaxis > 2 ){
			axis_Z_feedrate = parseInt(preferenceslist[0].z_feedrate);
		}
		
        if (grblaxis > 3 ){
			axis_A_feedrate = parseInt(preferenceslist[0].a_feedrate);
		}
		
        if (grblaxis > 4 ) {
			axis_B_feedrate = parseInt(preferenceslist[0].b_feedrate);
		}
		
        if (grblaxis > 5 ){
			axis_C_feedrate = parseInt(preferenceslist[0].c_feedrate);
		}
        
		
        if (grblaxis > 3 ){
            var letter = getById('control_select_axis').value;
            switch(letter) {
                case "Z":
                    getById('control_z_velocity').value = axis_Z_feedrate;
                break;
                case "A":
                    getById('control_z_velocity').value = axis_A_feedrate;
                break;
                case "B":
                    getById('control_z_velocity').value = axis_B_feedrate;
                break;
                case "C":
                    getById('control_z_velocity').value = axis_C_feedrate;
                break;
            }
        }
    } 
	
	
    getById('probemaxtravel').value = parseFloat(preferenceslist[0].probemaxtravel);
	
    getById('probefeedrate').value = parseInt(preferenceslist[0].probefeedrate);
	
    getById('probetouchplatethickness').value = parseFloat(preferenceslist[0].probetouchplatethickness);
	
    getById('tempInterval_check').value = parseInt(preferenceslist[0].interval_temperatures);
	
    getById('filament_length').value = parseInt(preferenceslist[0].e_distance);
	
    getById('extruder_velocity').value = parseInt(preferenceslist[0].e_feedrate);
	
    build_file_filter_list(preferenceslist[0].f_filters);
}





function showpreferencesdlg() {
	
    var modal = setactiveModal('preferencesdlg.html');
	
    if (modal == null){
		return;
	}
	
    language_save = language;
	
    build_dlg_preferences_list();
	
    getById('preferencesdlg_upload_msg').style.display = 'none';
	
    showModal();
}





function build_dlg_preferences_list() {
	
    //use preferenceslist to set dlg status
    var content = "<table><tr><td>";
    content += get_icon_svg("flag") + "&nbsp;</td><td>";
    content += build_language_list("language_preferences");
    content += "</td></tr></table>";
	
	
    getById("preferences_langage_list").innerHTML = content;
	
	
    //camera
    if (typeof(preferenceslist[0].enable_camera) !== 'undefined') {
        getById('show_camera_panel').checked = (preferenceslist[0].enable_camera === 'true');
    }else{
		getById('show_camera_panel').checked = false;
	}
	 

	
    //DHT
    if (typeof(preferenceslist[0].enable_DHT) !== 'undefined') {
        getById('enable_DHT').checked = (preferenceslist[0].enable_DHT === 'true');
    }else{
		getById('enable_DHT').checked = false;
	}
		
	
	
    //lock UI
    if (typeof(preferenceslist[0].enable_lock_UI) !== 'undefined') {
        getById('enable_lock_UI').checked = (preferenceslist[0].enable_lock_UI === 'true');
    }else{
		getById('enable_lock_UI').checked = false;
	}
		
	
	
	
    //Monitor connection
    if (typeof(preferenceslist[0].enable_ping) !== 'undefined') {
        getById('enable_ping').checked = (preferenceslist[0].enable_ping === 'true');
    }else{
		getById('enable_ping').checked = false;
	}
	
	
	
    //is mixed extruder
    if (typeof(preferenceslist[0].is_mixed_extruder) !== 'undefined') {
        getById('enable_mixed_E_controls').checked = (preferenceslist[0].is_mixed_extruder === 'true');
    }else{
		getById('enable_mixed_E_controls').checked = false;
	} 
	
	
	
    //build list of possible value accordingly
    build_extruder_list();

    //number of extruders
    if (typeof(preferenceslist[0].number_extruders) !== 'undefined') {
        var val = preferenceslist[0].number_extruders;
        if ((val > 2) && !getById('enable_mixed_E_controls').checked) val = 1;
        getById('preferences_control_nb_extruders').value = val;		
    }else{
		getById('preferences_control_nb_extruders').value = '1';
	}


    //heater t0 redundant
    if (typeof(preferenceslist[0].enable_redundant) !== 'undefined') {
       getById('enable_redundant_controls').checked = (preferenceslist[0].enable_redundant === 'true');
    }else{
	   getById('enable_redundant_controls').checked = false;
	}
	
	
	
    //probe
    if (typeof(preferenceslist[0].enable_probe) !== 'undefined') {
        getById('enable_probe_controls').checked = (preferenceslist[0].enable_probe === 'true');
    }else{
		getById('enable_probe_controls').checked = false;
	}
	
	
	
    //bed
    if (typeof(preferenceslist[0].enable_bed) !== 'undefined') {
        getById('enable_bed_controls').checked = (preferenceslist[0].enable_bed === 'true');
    }else{
		getById('enable_bed_controls').checked = false;
	}
	
	
	
	
    //chamber
    if (typeof(preferenceslist[0].enable_chamber) !== 'undefined') {
        getById('enable_chamber_controls').checked = (preferenceslist[0].enable_chamber === 'true');
    }else{
		getById('enable_chamber_controls').checked = false;
	}
	
	
    //fan
    if (typeof(preferenceslist[0].enable_fan) !== 'undefined') {
        getById('enable_fan_controls').checked = (preferenceslist[0].enable_fan === 'true');
    }else{
		getById('enable_fan_controls').checked = false;
	}
	 
	 
     //z axis 
     if (typeof(preferenceslist[0].enable_z ) !== 'undefined') {
		 if (getById('enable_z_controls') != null){
		   getById('enable_z_controls').checked = (preferenceslist[0].enable_z === 'true');
		 }   
     }else{
		if (getById('enable_z_controls') != null){ 
		   getById('enable_z_controls').checked = false;
		}
	 }
	 
	 
	 
    //grbl panel
    if (typeof(preferenceslist[0].enable_grbl_panel) !== 'undefined') {
        getById('show_grbl_panel').checked = (preferenceslist[0].enable_grbl_panel === 'true');
    }else{
		getById('show_grbl_panel').checked = false;
	}
	
	
	
    //grbl probe panel
    if (typeof(preferenceslist[0].enable_grbl_probe_panel) !== 'undefined') {
        getById('show_grbl_probe_tab').checked = (preferenceslist[0].enable_grbl_probe_panel === 'true');
    }else{
		getById('show_grbl_probe_tab').checked = false;
	}
	
	
	
    //control panel
    if (typeof(preferenceslist[0].enable_control_panel) !== 'undefined') {
        getById('show_control_panel').checked = (preferenceslist[0].enable_control_panel === 'true');
    }else{
		getById('show_control_panel').checked = false;
	}
	
	
	
    //temperatures panel
    if (typeof(preferenceslist[0].enable_temperatures_panel) !== 'undefined') {
        getById('show_temperatures_panel').checked = (preferenceslist[0].enable_temperatures_panel === 'true');
    }else{
		getById('show_temperatures_panel').checked = false;
	}
	
	
	
    //extruders
    if (typeof(preferenceslist[0].enable_extruder_panel) !== 'undefined') {
        getById('show_extruder_panel').checked = (preferenceslist[0].enable_extruder_panel === 'true');
    }else{
		getById('show_extruder_panel').checked = false;
	}
	
	
	
    //files panel
    if (typeof(preferenceslist[0].enable_files_panel) !== 'undefined') {
        getById('show_files_panel').checked = (preferenceslist[0].enable_files_panel === 'true');
    }else{
		getById('show_files_panel').checked = false;
	}
	
	
	
    //TFT SD
    if (typeof(preferenceslist[0].has_TFT_SD) !== 'undefined') {
        getById('has_tft_sd').checked = (preferenceslist[0].has_TFT_SD === 'true');
    }else{
		getById('has_tft_sd').checked = false;
	}
	
	
	
    //TFT USB
    if (typeof(preferenceslist[0].has_TFT_USB) !== 'undefined') {
        getById('has_tft_usb').checked = (preferenceslist[0].has_TFT_USB === 'true');
    }else{
		getById('has_tft_usb').checked = false;
	}
	
	
	
    //commands
    if (typeof(preferenceslist[0].enable_commands_panel) !== 'undefined') {
        getById('show_commands_panel').checked = (preferenceslist[0].enable_commands_panel === 'true');
    }else{
		getById('show_commands_panel').checked = false;
	}
	
	
	
    //interval positions
    if (typeof(preferenceslist[0].interval_positions) !== 'undefined') {
        getById('preferences_pos_Interval_check').value = parseInt(preferenceslist[0].interval_positions);
    }else{
		getById('preferences_pos_Interval_check').value = parseInt(default_preferenceslist[0].interval_positions);
	}
	
	
	
    //interval status
    if (typeof(preferenceslist[0].interval_status) !== 'undefined') {
        getById('preferences_status_Interval_check').value = parseInt(preferenceslist[0].interval_status);
    }else{
		getById('preferences_status_Interval_check').value = parseInt(default_preferenceslist[0].interval_status);
	}
	
	
	
    //xy feedrate
    if (typeof(preferenceslist[0].xy_feedrate) !== 'undefined') {
        getById('preferences_control_xy_velocity').value = parseInt(preferenceslist[0].xy_feedrate);
    }else{
		getById('preferences_control_xy_velocity').value = parseInt(default_preferenceslist[0].xy_feedrate);
	}
	
	
	
    if ((target_firmware != "grbl-embedded") || (grblaxis > 2)) {
        //z feedrate
        if (typeof(preferenceslist[0].z_feedrate) !== 'undefined') {
            getById('preferences_control_z_velocity').value = parseInt(preferenceslist[0].z_feedrate);
        }else{
			getById('preferences_control_z_velocity').value = parseInt(default_preferenceslist[0].z_feedrate);
		}
    }
	
	
	
    if (target_firmware == "grbl-embedded") {
		
        if (grblaxis > 3) {
            //a feedrate
            if (typeof(preferenceslist[0].a_feedrate) !== 'undefined') {
                getById('preferences_control_a_velocity').value = parseInt(preferenceslist[0].a_feedrate);			
            } else {
			   getById('preferences_control_a_velocity').value = parseInt(default_preferenceslist[0].a_feedrate);	
			}
        }
		
        if (grblaxis > 4) {
            //b feedrate
            if (typeof(preferenceslist[0].b_feedrate) !== 'undefined') {
                getById('preferences_control_b_velocity').value = parseInt(preferenceslist[0].b_feedrate);
            }else{
				getById('preferences_control_b_velocity').value = parseInt(default_preferenceslist[0].b_feedrate);
			}
        }
		
        if (grblaxis > 5) {
            //c feedrate
            if (typeof(preferenceslist[0].c_feedrate) !== 'undefined') {
                getById('preferences_control_c_velocity').value = parseInt(preferenceslist[0].c_feedrate);
            }else{
				getById('preferences_control_c_velocity').value = parseInt(default_preferenceslist[0].c_feedrate);
			}
        }
    }
	
	
    //probemaxtravel
    if ((typeof(preferenceslist[0].probemaxtravel) !== 'undefined') && (preferenceslist[0].probemaxtravel.length != 0)) {
        getById('preferences_probemaxtravel').value = parseFloat(preferenceslist[0].probemaxtravel);
    }else{
        getById('preferences_probemaxtravel').value = parseFloat(default_preferenceslist[0].probemaxtravel);
    }
	
	
    //probefeedrate
    if ((typeof(preferenceslist[0].probefeedrate) !== 'undefined') && (preferenceslist[0].probefeedrate.length != 0)) {
        getById('preferences_probefeedrate').value = parseInt(preferenceslist[0].probefeedrate);
    }else{
	   getById('preferences_probefeedrate').value = parseInt(default_preferenceslist[0].probefeedrate);
	}
    
	
	
	//probetouchplatethickness
    if ((typeof(preferenceslist[0].probetouchplatethickness) !== 'undefined') && (preferenceslist[0].probetouchplatethickness.length != 0)) {
        getById('preferences_probetouchplatethickness').value = parseFloat(preferenceslist[0].probetouchplatethickness);
    }else{
	    getById('preferences_probetouchplatethickness').value = parseFloat(default_preferenceslist[0].probetouchplatethickness);
	}
	
	
	
    //interval temperatures
    if (typeof(preferenceslist[0].interval_temperatures) !== 'undefined') {
        getById('preferences_tempInterval_check').value = parseInt(preferenceslist[0].interval_temperatures);
    }else{
		getById('preferences_tempInterval_check').value = parseInt(default_preferenceslist[0].interval_temperatures);
	}
	
	
	
    //e feedrate
    if (typeof(preferenceslist[0].e_feedrate) !== 'undefined') {
        getById('preferences_e_velocity').value = parseInt(preferenceslist[0].e_feedrate);
    }else{
		getById('preferences_e_velocity').value = parseInt(default_preferenceslist[0].e_feedrate);
	}
	
	
	
    //e distance
    if (typeof(preferenceslist[0].e_distance) !== 'undefined') {
        getById('preferences_filament_length').value = parseInt(preferenceslist[0].e_distance);
    }else{
		getById('preferences_filament_length').value = parseInt(default_preferenceslist[0].e_distance);
	}
	
	
	
    //autoscroll
    if (typeof(preferenceslist[0].enable_autoscroll) !== 'undefined') {
        getById('preferences_autoscroll').checked = (preferenceslist[0].enable_autoscroll === 'true');
    }else{
		getById('preferences_autoscroll').checked = false;
	}
	
	
	
    //Verbose Mode
    if (typeof(preferenceslist[0].enable_verbose_mode) !== 'undefined') {
        getById('preferences_verbose_mode').checked = (preferenceslist[0].enable_verbose_mode === 'true');
    }else{
		getById('preferences_verbose_mode').checked = false;
	}
	
	
	
    //file filters
    if (typeof(preferenceslist[0].f_filters) != 'undefined') {
        console.log("Use prefs filters");
        getById('preferences_filters').value = preferenceslist[0].f_filters;
    }else{
        console.log("Use default filters");
        getById('preferences_filters').value = String(default_preferenceslist[0].f_filters);
    }


    prefs_toggledisplay('show_camera_panel');
    prefs_toggledisplay('show_grbl_panel');
    prefs_toggledisplay('show_control_panel');
    prefs_toggledisplay('show_extruder_panel');
    prefs_toggledisplay('show_temperatures_panel');
    prefs_toggledisplay('enable_z_controls');
    prefs_toggledisplay('show_commands_panel');
    prefs_toggledisplay('show_files_panel');
    prefs_toggledisplay('show_grbl_probe_tab');
	
}





function closePreferencesDialog() {
	
    var modified = false;
	
    if (preferenceslist[0].length != 0) {
		
        //check dialog compare to global state
        if ((typeof(preferenceslist[0].language) === 'undefined') ||
            (typeof(preferenceslist[0].enable_camera) === 'undefined') ||	            	
            (typeof(preferenceslist[0].enable_DHT) === 'undefined') ||
            (typeof(preferenceslist[0].number_extruders) === 'undefined') ||
            (typeof(preferenceslist[0].is_mixed_extruder) === 'undefined') ||
            (typeof(preferenceslist[0].enable_lock_UI) === 'undefined') ||
            (typeof(preferenceslist[0].enable_ping) === 'undefined') ||
            (typeof(preferenceslist[0].enable_redundant) === 'undefined') ||
            (typeof(preferenceslist[0].enable_probe) === 'undefined') ||
            (typeof(preferenceslist[0].enable_bed) === 'undefined') ||
            (typeof(preferenceslist[0].enable_chamber) === 'undefined') ||
            (typeof(preferenceslist[0].enable_fan) === 'undefined') ||
            (typeof(preferenceslist[0].enable_z ) === 'undefined') ||
            (typeof(preferenceslist[0].xy_feedrate) === 'undefined') ||
            (typeof(preferenceslist[0].z_feedrate) === 'undefined') ||
            (typeof(preferenceslist[0].e_feedrate) === 'undefined') ||
            (typeof(preferenceslist[0].e_distance) === 'undefined') ||
            (typeof(preferenceslist[0].enable_control_panel) === 'undefined') ||
            (typeof(preferenceslist[0].enable_grbl_panel) === 'undefined') ||
            (typeof(preferenceslist[0].enable_grbl_probe_panel) === 'undefined') ||
            (typeof(preferenceslist[0].enable_temperatures_panel) === 'undefined') ||
            (typeof(preferenceslist[0].probemaxtravel) === 'undefined') ||
            (typeof(preferenceslist[0].probefeedrate) === 'undefined') ||
            (typeof(preferenceslist[0].probetouchplatethickness) === 'undefined') ||
            (typeof(preferenceslist[0].enable_extruder_panel) === 'undefined') ||
            (typeof(preferenceslist[0].enable_files_panel) === 'undefined') ||
            (typeof(preferenceslist[0].has_TFT_SD) === 'undefined') ||
            (typeof(preferenceslist[0].has_TFT_USB) === 'undefined') ||
            (typeof(preferenceslist[0].interval_positions) === 'undefined') ||
            (typeof(preferenceslist[0].interval_temperatures) === 'undefined') ||
            (typeof(preferenceslist[0].interval_status) === 'undefined') ||
            (typeof(preferenceslist[0].enable_autoscroll) === 'undefined') ||
            (typeof(preferenceslist[0].enable_verbose_mode) === 'undefined') ||
            (typeof(preferenceslist[0].enable_commands_panel) === 'undefined')) {
				
            modified = true;
			
        } else {
			
            //camera
            if (getById('show_camera_panel').checked != (preferenceslist[0].enable_camera === 'true')){
				modified = true;
			} 
			
			
           	
            //DHT
            if (getById('enable_DHT').checked != (preferenceslist[0].enable_DHT === 'true')) {
				modified = true;
			}
				
            //Lock UI	
            if (getById('enable_lock_UI').checked != (preferenceslist[0].enable_lock_UI === 'true')){
				modified = true;
			} 
			
			
            //Monitor connection
            if (getById('enable_ping').checked != (preferenceslist[0].enable_ping === 'true')) {
				modified = true;
			}
			
			
            //number extruders
            if (getById('preferences_control_nb_extruders').value != parseInt(preferenceslist[0].number_extruders)) {
				modified = true;
			}
			

            //is mixed extruder
            if (getById('enable_mixed_E_controls').checked != (preferenceslist[0].is_mixed_extruder === 'true')){
				modified = true;
			} 
			
			
            //heater t0 redundant
            if (getById('enable_redundant_controls').checked != (preferenceslist[0].enable_redundant === 'true')){
				modified = true;
			} 
			
			
            //probe
            if (getById('enable_probe_controls').checked != (preferenceslist[0].enable_probe === 'true')){
				modified = true;
			} 
			
			
            //bed
            if (getById('enable_bed_controls').checked != (preferenceslist[0].enable_bed === 'true')) {
				modified = true;
			}
			
			
            //chamber
            if (getById('enable_chamber_controls').checked != (preferenceslist[0].enable_chamber === 'true')) {
				modified = true;
			}
			
            //fan.
            if (getById('enable_fan_controls').checked != (preferenceslist[0].enable_fan === 'true')) {
				modified = true;
			}
					
            //control panel
            if (getById('show_control_panel').checked != (preferenceslist[0].enable_control_panel === 'true')) {
				modified = true;
			}
			
			
            //temperatures panel
            if (getById('show_temperatures_panel').checked != (preferenceslist[0].enable_temperatures_panel === 'true')) {
			   modified = true;	
			}
			
			
			
            //grbl panel
            if (getById('show_grbl_panel').checked != (preferenceslist[0].enable_grbl_panel === 'true')) {
			  modified = true;	
			}
			
			
            //grbl probe panel
            if (getById('show_grbl_probe_tab').checked != (preferenceslist[0].enable_grbl_probe_panel === 'true')) {
				modified = true;
			}
			
			
			
            //extruder panel
            if (getById('show_extruder_panel').checked != (preferenceslist[0].enable_extruder_panel === 'true')) {
				modified = true;
			}
			
			
            //files panel
            if (getById('show_files_panel').checked != (preferenceslist[0].enable_files_panel === 'true')) {
				modified = true;
			}
			
			
			
            //TFT SD
            if (getById('has_tft_sd').checked != (preferenceslist[0].has_TFT_SD === 'true')) {
				modified = true;
			}
			
			
			
            //TFT USB
            if (getById('has_tft_usb').checked != (preferenceslist[0].has_TFT_USB === 'true')) {
				modified = true;
			}
			
			
            //commands
            if (getById('show_commands_panel').checked != (preferenceslist[0].enable_commands_panel === 'true')){
				modified = true;
			} 
			
            //interval positions
            if (getById('preferences_pos_Interval_check').value != parseInt(preferenceslist[0].interval_positions)){
				 modified = true;
			}
			
			
            //interval status
            if (getById('preferences_status_Interval_check').value != parseInt(preferenceslist[0].interval_status)) {
				modified = true;
			}
			
            //xy feedrate
            if (getById('preferences_control_xy_velocity').value != parseInt(preferenceslist[0].xy_feedrate)) {
				modified = true;
			}
			
			
            if ((target_firmware != "grbl-embedded") || (grblaxis > 2)) {
                //z feedrate
                if (getById('preferences_control_z_velocity').value != parseInt(preferenceslist[0].z_feedrate)) modified = true;				
            }
			
			
            if (target_firmware == "grbl-embedded") {
                if (grblaxis > 3) {
                    //a feedrate
                    if (getById('preferences_control_a_velocity').value != parseInt(preferenceslist[0].a_feedrate)) modified = true;
                }
                if (grblaxis > 4) {
                    //b feedrate
                    if (getById('preferences_control_b_velocity').value != parseInt(preferenceslist[0].b_feedrate)) modified = true;
                }
                if (grblaxis > 5) {
                    //c feedrate
                    if (getById('preferences_control_c_velocity').value != parseInt(preferenceslist[0].c_feedrate)) modified = true;
                }
            }
			
            //interval temperatures
            if (getById('preferences_tempInterval_check').value != parseInt(preferenceslist[0].interval_temperatures)) {
				modified = true;
			}
			
            //e feedrate
            if (getById('preferences_e_velocity').value != parseInt(preferenceslist[0].e_feedrate)) {
				modified = true;
			}
			
			
            //e distance
            if (getById('preferences_filament_length').value != parseInt(preferenceslist[0].e_distance)) {
				modified = true;
			}
			
			
            //autoscroll
            if (getById('preferences_autoscroll').checked != (preferenceslist[0].enable_autoscroll === 'true')) {
				modified = true;
			}
			
			
            //Verbose Mode
            if (getById('preferences_verbose_mode').checked != (preferenceslist[0].enable_verbose_mode === 'true')) {
				modified = true;
			}
			
			
            //file filters
            if (getById('preferences_filters').value != preferenceslist[0].f_filters) {
			    modified = true;	
			}
			
			
            //probemaxtravel
            if (getById('preferences_probemaxtravel').value != parseFloat(preferenceslist[0].probemaxtravel)){
				modified = true;
			}
			
			
            //probefeedrate
            if (getById('preferences_probefeedrate').value != parseInt(preferenceslist[0].probefeedrate)) {
				modified = true;
			}
			
			
            //probetouchplatethickness
            if (getById('preferences_probetouchplatethickness').value != parseFloat(preferenceslist[0].probetouchplatethickness)) {
				modified = true;
			}
					
        }
		
		
    }else{
		
		modified = true;
	}
	
	
	
    if (language_save != language) {
		modified = true;
	}
	
	
    if (modified) {
        confirmdlg(translate_text_item("Data mofified"), translate_text_item("Do you want to save?"), process_preferencesCloseDialog)
    }else{
        closeModal('cancel');
    }
}



function process_preferencesCloseDialog(answer) {
    if (answer == 'no') {
        //console.log("Answer is no so exit");
        translate_text(language_save);
        closeModal('cancel');
    }else{
        // console.log("Answer is yes so let's save");
        SavePreferences();
    }
}





function SavePreferences(current_preferences) {
	var url ="";
	
	
    if (http_communication_locked) {
        alertdlg(translate_text_item("Busy..."), translate_text_item("Communications are currently locked, please wait and retry."));
        return;
    }
	
    console.log("save prefs");
	
    if (((typeof(current_preferences) != 'undefined') && !current_preferences) || (typeof(current_preferences) == 'undefined')) {
        if (!Checkvalues("preferences_pos_Interval_check") ||
            !Checkvalues("preferences_status_Interval_check") ||
            !Checkvalues("preferences_control_xy_velocity") ||
            !Checkvalues("preferences_control_z_velocity") ||
            !Checkvalues("preferences_e_velocity") ||
            !Checkvalues("preferences_tempInterval_check") ||
            !Checkvalues("preferences_filters") ||
            !Checkvalues("preferences_filament_length") ||
            !Checkvalues("preferences_probemaxtravel") ||
            !Checkvalues("preferences_probefeedrate") ||
            !Checkvalues("preferences_probetouchplatethickness")
        ) return;
		
        if ((target_firmware != "grbl-embedded") || (grblaxis > 2)) {
            if(!Checkvalues("preferences_control_z_velocity")) return;
        }
		
        if (target_firmware == "grbl-embedded") {
            if( (grblaxis > 3) && (!Checkvalues("preferences_control_a_velocity"))) return;
            if( (grblaxis > 4) && (!Checkvalues("preferences_control_b_velocity"))) return;
            if( (grblaxis > 5) && (!Checkvalues("preferences_control_c_velocity"))) return;
        }
		
        preferenceslist = [];
        var saveprefs = "[{\"language\":\"" + language;
        saveprefs += "\",\"enable_camera\":\"" + getById('show_camera_panel').checked;
        	
			
        saveprefs += "\",\"enable_DHT\":\"" + getById('enable_DHT').checked;
        saveprefs += "\",\"enable_lock_UI\":\"" + getById('enable_lock_UI').checked;
        saveprefs += "\",\"enable_ping\":\"" + getById('enable_ping').checked;
        saveprefs += "\",\"is_mixed_extruder\":\"" + getById('enable_mixed_E_controls').checked;
        saveprefs += "\",\"number_extruders\":\"" + getById('preferences_control_nb_extruders').value;
        saveprefs += "\",\"enable_redundant\":\"" + getById('enable_redundant_controls').checked;
        saveprefs += "\",\"enable_probe\":\"" + getById('enable_probe_controls').checked;
        saveprefs += "\",\"enable_bed\":\"" + getById('enable_bed_controls').checked;
        saveprefs += "\",\"enable_chamber\":\"" + getById('enable_chamber_controls').checked;
        saveprefs += "\",\"enable_fan\":\"" + getById('enable_fan_controls').checked;
		
		
		if(getById('enable_z_controls') != null){
			saveprefs += "\",\"enable_z\":\"" + getById('enable_z_controls').checked;
		}
        
			
        saveprefs += "\",\"enable_control_panel\":\"" + getById('show_control_panel').checked;
        saveprefs += "\",\"enable_grbl_probe_panel\":\"" + getById('show_grbl_probe_tab').checked;
        saveprefs += "\",\"enable_temperatures_panel\":\"" + getById('show_temperatures_panel').checked;
        saveprefs += "\",\"enable_extruder_panel\":\"" + getById('show_extruder_panel').checked;
        saveprefs += "\",\"enable_grbl_panel\":\"" + getById('show_grbl_panel').checked;
        saveprefs += "\",\"enable_files_panel\":\"" + getById('show_files_panel').checked;
        saveprefs += "\",\"has_TFT_SD\":\"" + getById('has_tft_sd').checked;
        saveprefs += "\",\"has_TFT_USB\":\"" + getById('has_tft_usb').checked;
        saveprefs += "\",\"probemaxtravel\":\"" + getById('preferences_probemaxtravel').value;
        saveprefs += "\",\"probefeedrate\":\"" + getById('preferences_probefeedrate').value;
        saveprefs += "\",\"probetouchplatethickness\":\"" + getById('preferences_probetouchplatethickness').value;
        saveprefs += "\",\"interval_positions\":\"" + getById('preferences_pos_Interval_check').value;
        saveprefs += "\",\"interval_status\":\"" + getById('preferences_status_Interval_check').value;
        saveprefs += "\",\"xy_feedrate\":\"" + getById('preferences_control_xy_velocity').value;
		
        if ((target_firmware != "grbl-embedded") || (grblaxis > 2)) {
            saveprefs += "\",\"z_feedrate\":\"" + getById('preferences_control_z_velocity').value;
        }
		
        if (target_firmware == "grbl-embedded") {
            if (grblaxis > 3){
                saveprefs += "\",\"a_feedrate\":\"" + getById('preferences_control_a_velocity').value;
            }
            if (grblaxis > 4){
                saveprefs += "\",\"b_feedrate\":\"" + getById('preferences_control_b_velocity').value;
            }
            if (grblaxis > 5){
                saveprefs += "\",\"c_feedrate\":\"" + getById('preferences_control_c_velocity').value;
            }
        }
		
        saveprefs += "\",\"interval_temperatures\":\"" + getById('preferences_tempInterval_check').value;
        saveprefs += "\",\"e_feedrate\":\"" + getById('preferences_e_velocity').value;
        saveprefs += "\",\"e_distance\":\"" + getById('preferences_filament_length').value;
        saveprefs += "\",\"f_filters\":\"" + getById('preferences_filters').value;
        saveprefs += "\",\"enable_autoscroll\":\"" + getById('preferences_autoscroll').checked;
        saveprefs += "\",\"enable_verbose_mode\":\"" + getById('preferences_verbose_mode').checked;
        saveprefs += "\",\"enable_commands_panel\":\"" + getById('show_commands_panel').checked + "\"}]";
        preferenceslist = JSON.parse(saveprefs);
		
		//DEGUG:
		console.log ("Preferences to save: "  + JSON.stringify(preferenceslist, null, " "));
		
    }
	
	
	
	
    var blob = new Blob([JSON.stringify(preferenceslist, null, " ")], {
        type: 'application/json'
    });
	
    var file;
	
	
    if (browser_is("IE") || browser_is("Edge")) {
        file = blob;
        file.name = preferences_file_name;
        file.lastModifiedDate = new Date();
    } else {
		file = new File([blob], preferences_file_name);
    }
	
	
    var formData = new FormData();
	
	
	//MIRKO
	if (!remove) {
	  url = esp32_address + "/files";
	}else{
	  url = "/files";
	}
	
	
    //console.log(url);
		
    formData.append('path', '/');
	
    formData.append('myfile[]', file, preferences_file_name);
	

    if ((typeof(current_preferences) != 'undefined') && current_preferences) {
		SendFileHttp(url, formData);
	}else{
		SendFileHttp(url, formData, preferencesdlgUploadProgressDisplay, preferencesUploadsuccess, preferencesUploadfailed);
	}
	
	
}





function preferencesdlgUploadProgressDisplay(oEvent) {
	
    if (oEvent.lengthComputable) {
        var percentComplete = (oEvent.loaded / oEvent.total) * 100;
        getById('preferencesdlg_prg').value = percentComplete;
        getById('preferencesdlg_upload_percent').innerHTML = percentComplete.toFixed(0);
        getById('preferencesdlg_upload_msg').style.display = 'block';
    } else {
		console.log('Impossible because size is unknown');      
    }
	
}



function preferencesUploadsuccess(response) {
    getById('preferencesdlg_upload_msg').style.display = 'none';
    applypreferenceslist();
    closeModal('ok');
}

function preferencesUploadfailed(errorcode, response) {
    alertdlg(translate_text_item("Error"), translate_text_item("Save preferences failed!"));
}



function Checkvalues(id_2_check) {
    var status = true;
	
    var value = 0;
	
	
    switch (id_2_check) {
		
        case "preferences_status_Interval_check":
		
        case "preferences_tempInterval_check":
		
        case "preferences_pos_Interval_check":
            value = parseInt(getById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 100)) {
                error_message = translate_text_item("Value of auto-check must be between 0s and 99s !!");
                status = false;
            }
            break;
			
        case "preferences_control_xy_velocity":
            value = parseInt(getById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1)) {
                error_message = translate_text_item("XY Feedrate value must be at least 1 mm/min!");
                status = false;
            }
            break;
			
        case "preferences_control_z_velocity":
            value = parseInt(getById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1)) {
                error_message = translate_text_item("Z Feedrate value must be at least 1 mm/min!");
                status = false;
            }
            break;
			
        case "preferences_control_a_velocity":
		
        case "preferences_control_b_velocity":
		
        case "preferences_control_c_velocity":
		
            value = parseInt(getById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1)) {
                error_message = translate_text_item("Axis Feedrate value must be at least 1 mm/min!");
                status = false;
            }
            break;
			
        case "preferences_tempInterval_check":
            value = parseInt(getById(id_2_check).value);
            if (!(!isNaN(value) && value > 0 && value < 100)) {
                error_message = translate_text_item("Value of auto-check must be between 0s and 99s !!");
                status = false;
            }
            break;
			
        case "preferences_e_velocity":
            value = parseInt(getById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
                error_message = translate_text_item("Value of extruder velocity must be between 1 mm/min and 9999 mm/min !");
                status = false;
            }
            break;
			
        case "preferences_probefeedrate":
            value = parseInt(getById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
                error_message = translate_text_item("Value of probe feedrate must be between 1 mm/min and 9999 mm/min !");
                status = false;
            }
            break;
			
        case "preferences_probemaxtravel":
            value = parseInt(getById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
                error_message = translate_text_item("Value of maximum probe travel must be between 1 mm and 9999 mm !");
                status = false;
            }
            break;
			
        case "preferences_probetouchplatethickness":
            value = parseInt(getById(id_2_check).value);
            if (!(!isNaN(value) && value >= 0 && value <= 9999)) {
                error_message = translate_text_item("Value of probe touch plate thickness must be between 0 mm and 9999 mm !");
                status = false;
            }
            break;
			
        case "preferences_filament_length":
            value = parseInt(getById(id_2_check).value);
            if (!(!isNaN(value) && value >= 0.001 && value <= 9999)) {
                error_message = translate_text_item("Value of filament length must be between 0.001 mm and 9999 mm !");
                status = false;
            }
            break;
			
        case "preferences_filters":
            //TODO a regex would be better
            value = getById(id_2_check).value;
            if ((value.indexOf(".") != -1) ||
                (value.indexOf("*") != -1)) {
                error_message = translate_text_item("Only alphanumeric chars separated by ; for extensions filters");
                status = false;
            }
            break;
    }
	
    if (status) {
        getById(id_2_check + "_group").classList.remove("has-feedback");
        getById(id_2_check + "_group").classList.remove("has-error");
        getById(id_2_check + "_icon").innerHTML = "";
    } else {
        getById(id_2_check + "_group").classList.add("has-feedback");
        getById(id_2_check + "_group").classList.add("has-error");
        getById(id_2_check + "_icon").innerHTML = get_icon_svg("remove");
        alertdlg(translate_text_item("Out of range"), error_message);
    }
	
    return status;
}
