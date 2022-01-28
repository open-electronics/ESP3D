function opentab(evt, tabname, tabcontentid, tablinkid) {
    var i;
	var tabcontent;
	var tablinks;
	
    tabcontent = document.getElementsByClassName("tabcontent");
	
    for (i = 0; i < tabcontent.length; i++) {		
        if (tabcontent[i].parentNode.id == tabcontentid) {
            tabcontent[i].style.display = "none";
        }
    }
	
    tablinks = document.getElementsByClassName("tablinks");
	
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].parentNode.id == tablinkid){
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    }
	
    getById(tabname).style.display = "block";
	
	
	//console.log("opentab:" + tabname);
	
	
	
	if (tabname == "camtab"){    	
        camera_loadframe();			
		HandleButtonVisibility(); 
        refresh_camera_url();     	
	}else {
		camera_detachcam();
		clearInterval(camera_refesh_interval_id);
	}
		
		
    evt.currentTarget.className += " active";
}
