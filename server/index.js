var express = require("express");
const path = require("path");
const https = require('https');
const fs = require('fs');
const settings = require("./settings.json");
var cors = require('cors')
var bodyParser = require("body-parser");
var sha256 = require("sha256");

const login = require("./login");

//Creating Express App
var app = express();

//Enable cors
app.use(cors());

//enable body-parser to Express
app.use(bodyParser.urlencoded({ extended: false}));



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




var htmlCodeLogin = "";
fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    htmlCodeLogin = html;
});

//routes
app.get('/', (req, res) => res.send(htmlCodeLogin));
app.post("/", function(req,res){
    console.log(req.body);
    login.loginAttempt(req.body.username, req.body.password);

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
