var express = require("express");
const path = require("path");
const https = require('https');
const fs = require('fs');
const settings = require("./settings.json");

const login = require("./login");

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
app.use('/login', login);

//Starting Server
if(settings.online){
    console.log("HTTPS Started with port: " + settings.port);
    https.createServer(options, app).listen(settings.port);
}
else{
    console.log("HTTP Started with port: " + settings.port);
    app.listen(settings.port);
}
