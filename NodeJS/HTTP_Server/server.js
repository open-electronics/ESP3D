// load the things we need
/*
https://italiancoders.it/abilitare-cors-su-express/
*/


var express = require('express');
var favicon = require('serve-favicon');
var path = require('path')
var ip = require("ip");
var app = express();


app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/www/');


app.use(favicon(path.join(__dirname, '/www/favicon.ico')))
app.use('/css', express.static(__dirname + '/www/css'));
app.use('/js', express.static(__dirname + '/www/js'));
app.use('/images', express.static(__dirname + '/www/images'));


// index page 
app.get('/', function(req, res) {
	res.render('index.html');
});


app.listen(80);


console.log ('HTTP SERVER up and running');

console.log ( "open browser at: http://" +  ip.address() );






