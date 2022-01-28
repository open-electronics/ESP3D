//setup dialog

var active_wizard_page = 0;
var maz_page_wizard = 5;

function setupdlg() {
    setup_is_done = false;
    language_save = language;
    getById('main_ui').style.display = 'none';
    getById('settings_list_data').innerHTML = "";
    active_wizard_page = 0;
    
	//reset page 1
    getById("startsteplink").className = getById("startsteplink").className.replace(" wizard_done", "");
    getById("wizard_button").innerHTML = translate_text_item("Start setup");
    getById("wizard_line1").style.background = "#e0e0e0";
    getById("step1link").disabled = true;
    getById("step1link").className = "steplinks disabled";
    
	//reset page 2
    getById("step1link").className = getById("step1link").className.replace(" wizard_done", "");
    getById("wizard_line2").style.background = "#e0e0e0";
    getById("step2link").disabled = true;
    getById("step2link").className = "steplinks disabled";
    
	//reset page 3
    getById("step2link").className = getById("step2link").className.replace(" wizard_done", "");
    getById("wizard_line3").style.background = "#e0e0e0";
    getById("step3link").disabled = true;
    getById("step3link").className = "steplinks disabled";
    if (!direct_sd || (target_firmware == "grbl-embedded") || (target_firmware == "marlin-embedded")) {
        getById("step3link").style.display = 'none';
        getById("wizard_line4").style.display = 'none';
    } else {
        getById("step3link").style.display = 'block';
        getById("wizard_line4").style.display = 'block';
    }
	
    //reset page 4
    getById("step3link").className = getById("step3link").className.replace(" wizard_done", "");
    getById("wizard_line4").style.background = "#e0e0e0";
    getById("endsteplink").disabled = true;
    getById("endsteplink").className = "steplinks disabled";
    var content = "<table><tr><td>";
    content += get_icon_svg("flag") + "&nbsp;</td><td>";
    content += build_language_list("language_selection");
    content += "</td></tr></table>";
    getById("setup_langage_list").innerHTML = content;

    var modal = setactiveModal('setupdlg.html', setupdone);
    if (modal == null) return;
    showModal();
    getById("startsteplink", true).click();
}


function setupdone(response) {
    setup_is_done = true;
    do_not_build_settings = false;
    build_HTML_setting_list(current_setting_filter);
    translate_text(language_save);
    getById('main_ui').style.display = 'block';
    closeModal("setup done");

}

function continue_setup_wizard() {
    active_wizard_page++;
    switch (active_wizard_page) {
        case 1:
            enablestep1();
            preferenceslist[0].language = language;
            SavePreferences(true);
            language_save = language;
            break;
        case 2:
            enablestep2();
            break;
        case 3:
            if (!direct_sd || (target_firmware == "grbl-embedded") || (target_firmware == "marlin-embedded")) {
                active_wizard_page++;
                getById("wizard_line3").style.background = "#337AB7";
                enablestep4();
            } else enablestep3();
            break;
        case 4:
            enablestep4();
            break;
        case 5:
            closeModal('ok')
            break;
        default:
            console.log("wizard page out of range");
    }
}


function enablestep1() {
    var content = "";
    var index = 0;
    if (getById("startsteplink").className.indexOf(" wizard_done") == -1) {
        getById("startsteplink").className += " wizard_done";
        if (!can_revert_wizard) getById("startsteplink").className += " no_revert_wizard";
    }
    getById("wizard_button").innerHTML = translate_text_item("Continue");
    getById("wizard_line1").style.background = "#337AB7";
    getById("step1link").disabled = "";
    getById("step1link").className = getById("step1link").className.replace(" disabled", "");
	
    content += "<h4>" + translate_text_item("ESP3D Settings") + "</h4><hr>";
	
    if (!((target_firmware == "grbl-embedded") || (target_firmware == "marlin-embedded"))) {
       
	    index = get_index_from_eeprom_pos(EP_TARGET_FW);	
        content += translate_text_item("Save your printer's firmware base:");
        content += build_control_from_index(index);
        content += translate_text_item("This is mandatory to get ESP working properly.");
        content += "<hr>\n";
		
		
        index = get_index_from_eeprom_pos(EP_BAUD_RATE);	
        content += translate_text_item("Save your printer's board current baud rate:");
        content += build_control_from_index(index);
        content += translate_text_item("Printer and ESP board must use same baud rate to communicate properly.") + "<br>";
        content += "<hr>\n";
    }
	
    index = get_index_from_eeprom_pos(EP_HOSTNAME);
    content += translate_text_item("Define ESP name:") + "<table><tr><td>";
    content += build_control_from_index(index);
    content += "</td></tr></table>";

    getById("step1").innerHTML = content;
    getById("step1link").click();
}


function define_esp_role(index) {
    if (!((setting_configList[index].defaultvalue == SETTINGS_AP_MODE) || (setting_configList[index].defaultvalue == SETTINGS_STA_MODE))) {
        getById("setup_STA").style.display = "none";
        getById("setup_AP").style.display = "none";
    }
    if (setting_configList[index].defaultvalue == SETTINGS_AP_MODE) {
        getById("setup_STA").style.display = "none";
        getById("setup_AP").style.display = "block";
    }
    if (setting_configList[index].defaultvalue == SETTINGS_STA_MODE) {
        getById("setup_STA").style.display = "block";
        getById("setup_AP").style.display = "none";
    }
}

function enablestep2() {
    var content = "";
	
    if (getById("step1link").className.indexOf("wizard_done") == -1) {
        getById("step1link").className += " wizard_done";
        if (!can_revert_wizard) getById("step1link").className += " no_revert_wizard";
    }
	
    getById("wizard_line2").style.background = "#337AB7";
	
    getById("step2link").disabled = "";
    getById("step2link").className = getById("step2link").className.replace(" disabled", "");
    index = get_index_from_eeprom_pos(EP_WIFI_MODE);
	
    content += "<h4>" + translate_text_item("WiFi Configuration") + "</h4><hr>";
    content += translate_text_item("Define ESP role:") + "<table><tr><td>";
    content += build_control_from_index(index, "define_esp_role");
    content += "</td></tr></table>" + translate_text_item("AP define access point / STA allows to join existing network") + "<br>";
    content += "<hr>\n";
	
    index = get_index_from_eeprom_pos(EP_STA_SSID);
    content += "<div id='setup_STA'>";
    content += translate_text_item("What access point ESP need to be connected to:") + "<table><tr><td>";
    content += build_control_from_index(index);
    content += "</td></tr></table>" + translate_text_item("You can use scan button, to list available access points.") + "<br>";
    content += "<hr>\n";
	
    index = get_index_from_eeprom_pos(EP_STA_PASSWORD);
    content += translate_text_item("Password to join access point:") + "<table><tr><td>";
    content += build_control_from_index(index);
    content += "</td></tr></table>";
    content += "</div>";
	
    content += "<div id='setup_AP'>";
    content += translate_text_item("What is ESP access point SSID:") + "<table><tr><td>";
    index = get_index_from_eeprom_pos(EP_AP_SSID);
    content += build_control_from_index(index);
    content += "</td></tr></table>";
    content += "<hr>\n";
	
    index = get_index_from_eeprom_pos(EP_AP_PASSWORD);
    content += translate_text_item("Password for access point:") + "<table><tr><td>";
    content += build_control_from_index(index);
    content += "</td></tr></table>";
	
    if (!((target_firmware == "grbl-embedded") || (target_firmware == "marlin-embedded"))) {
        content += "<hr>\n";
        content += translate_text_item("Define security:") + "<table><tr><td>";
        index = get_index_from_eeprom_pos(EP_AUTH_TYPE);
        content += build_control_from_index(index);
        content += "</td></tr></table>";
    }
	
    content += "</div>";
    getById("step2").innerHTML = content;
    define_esp_role(get_index_from_eeprom_pos(EP_WIFI_MODE));
    getById("step2link").click();
}


function define_sd_role(index) {
    if (setting_configList[index].defaultvalue == 1) {
        getById("setup_SD").style.display = "block";
        if (target_firmware == "smoothieware") getById("setup_primary_SD").style.display = "block";
        else getById("setup_primary_SD").style.display = "none";
    } else {
        getById("setup_SD").style.display = "none";
        getById("setup_primary_SD").style.display = "none";
    }
}

function enablestep3() {
    var content = "";
    if (getById("step2link").className.indexOf("wizard_done") == -1) {
        getById("step2link").className += " wizard_done";
        if (!can_revert_wizard) getById("step2link").className += " no_revert_wizard";
    }
    getById("wizard_line3").style.background = "#337AB7";
    getById("step3link").disabled = "";
    getById("step3link").className = getById("step3link").className.replace(" disabled", "");
    index = get_index_from_eeprom_pos(EP_IS_DIRECT_SD);
    content += "<h4>" + translate_text_item("SD Card Configuration") + "</h4><hr>";
    content += translate_text_item("Is ESP connected to SD card:") + "<table><tr><td>";
    content += build_control_from_index(index, "define_sd_role");
    content += "</td></tr></table>";
    content += "<hr>\n";
    content += "<div id='setup_SD'>";
    index = get_index_from_eeprom_pos(EP_DIRECT_SD_CHECK);
    content += translate_text_item("Check update using direct SD access:") + "<table><tr><td>";
    content += build_control_from_index(index);
    content += "</td></tr></table>";
    content += "<hr>\n";
    content += "<div id='setup_primary_SD'>";
    index = get_index_from_eeprom_pos(EP_PRIMARY_SD);
    content += translate_text_item("SD card connected to ESP") + "<table><tr><td>";
    content += build_control_from_index(index);
    content += "</td></tr></table>";
    content += "<hr>\n";
    index = get_index_from_eeprom_pos(EP_SECONDARY_SD);
    content += translate_text_item("SD card connected to printer") + "<table><tr><td>";
    content += build_control_from_index(index);
    content += "</td></tr></table>";
    content += "<hr>\n";
    content += "</div>";
    content += "</div>";
    getById("step3").innerHTML = content;
    define_sd_role(get_index_from_eeprom_pos(EP_IS_DIRECT_SD));
    getById("step3link").click();
}


function enablestep4() {
    if (getById("step3link").className.indexOf("wizard_done") == -1) {
        getById("step3link").className += " wizard_done";
        if (!can_revert_wizard) getById("step3link").className += " no_revert_wizard";
    }
    getById("wizard_button").innerHTML = translate_text_item("Close");
    getById("wizard_line4").style.background = "#337AB7";
    getById("endsteplink").disabled = "";
    getById("endsteplink").className = getById("endsteplink").className.replace(" disabled", "");
    getById("endsteplink").click();
}