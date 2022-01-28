
// https://www.sitepoint.com/community/t/should-we-use-getelementbyid/279268




function getById(id) {
    var el = document.getElementById(id);
    if (!el) {
		console.log("######## ERROR: " + id + " is not defined");			
        //throw new ReferenceError(id + " is not defined");
    }
    return el;
}


/*
function getById(id) {
   return document.getElementById(id);
}
*/