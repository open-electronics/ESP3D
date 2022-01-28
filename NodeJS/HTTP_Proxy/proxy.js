
/*
https://www.npmjs.com/package/http-proxy-middleware
https://italiancoders.it/cors-in-dettaglio/
https://italiancoders.it/abilitare-cors-su-express/
*/


/*
Il traffico sulla porta 82 locale viene ridiretto verso il dispositivo ESP32 sulla porta 80

ESempio:
Server Nodejs          Server Esp32 Fisico
192.168.1.232:82   ->>  192.168.1.188:80

*/

var fs = require('fs');
var express = require('express');
var cors = require('cors')
var ip = require("ip");



// Porta su cui sta in ascolto il  Proxy
var origin_port = 82;


// Indirizzo del dispositivo fisico ESP32 
var target_url = "http://192.168.1.32";





var js_content =  "var esp32_address = \"http://" + ip.address() + ":" +  origin_port + "\";";
try {
  var server_dir = __dirname.replace("HTTP_Proxy", "HTTP_Server");
  const data = fs.writeFileSync(server_dir + '/www/js/Proxy_Address.js', js_content)  
} catch (err) {
  console.error(err)
}



console.log ("HTTP proxy up and running");
console.log ("listening on port: " + origin_port );
console.log ("Target url: " + target_url );


var proxy = require('http-proxy-middleware');
 
var app = express();
 
app.use(cors());
 
 
var proxyOpts = {
    target: target_url, 
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        // Log outbound request to remote target
        console.log('-->  ', req.method, req.path, '->', proxyReq.baseUrl + proxyReq.path);
    },
    onError: function onError(err, req, res) {
        console.error(err);
        res.status(500);
        res.json({error: 'Error when connecting to remote server.'});
    },
    logLevel: 'debug',
    changeOrigin: false,
    secure: true
};
 
 
app.use('/', proxy(proxyOpts));


app.listen(origin_port, function () {
  console.log('CORS abilitati');
})