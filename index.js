var express = require("express");
const path = require("path");
const https = require('https');
const fs = require('fs');
const settings = require("./settings.json");

//Creating Express App
var app = express();

//SSL Certificate and enable if settings.online = true
var options;
if(settings.online){
    options = {
      key: fs.readFileSync(settings.pathToCertKey),
      cert: fs.readFileSync(settings.pathToCertCert),
      ca: fs.readFileSync(settings.pathToCertChain)
    };
}


//Enable Static files
app.use(express.static(path.join(__dirname)));

//routes
app.use('/', function(req, res){
    res.end("<button>Click Me if you dare!!! </button>\n");
});

//Starting Server
if(settings.online){
    console.log("HTTPS Started with port: " + settings.port);
    https.createServer(options, app).listen(settings.port);
}
else{
    console.log("HTTP Started with port: " + settings.port);
    app.listen(settings.port);
}
