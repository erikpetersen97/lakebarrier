var express = require("express");
const path = require("path");
const https = require('https');
const fs = require('fs');
const settings = require("./settings.json");
var cors = require('cors')
var bodyParser = require("body-parser");
var sha256 = require("sha256");
var mime = require("mime");



const login = require("./login");
const sqlite3 = require('sqlite3').verbose();
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
var htmlCodeLoginError = "";
fs.readFile('./indexError.html', function (err, html) {
    if (err) {
        throw err;
    }
    htmlCodeLoginError = html;
});



//routes
app.get('/', (req, res) => res.send(htmlCodeLogin));
app.post("/", function(req,res){

    login.loginAttempt(req.body.username, req.body.password, req, res, processCallback);


});
function processCallback(value, req, res){

    if(value){
        console.log("Hipp Hurray Here is link");

        var file = __dirname + '/test.txt';

        var filename = path.basename(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);


        var filestream = fs.createReadStream(file);
        filestream.pipe(res);



    }
    else{
        console.log("Sorry no Software for you");
        res.send(htmlCodeLoginError);
    }
}


//
//
// let db = new sqlite3.Database(settings.dbLocation);
// var loginData = 'INSERT INTO LoginData(username, password)VALUES("erik", "pass");';
//
// var userData = 'INSERT INTO UserData(FirstName, LastName, Age, Country, Address, Zipcode, Email, ExpireDate, Permission)VALUES ('
// + '"Erik", "Petersen", "20", "Sweden", "Nygatan 4", "28931", "erik_cool_97@live.se", "Tomorrow", "5"' +');';
//
//
//
//                         db.run(loginData, function(err){
//                             if(err){
//                                 console.log("First Error in db" + err);
//                             }
//                             else{
//                                 console.log("Success insert LoginData");
//                                 db.run(userData, function(err){
//                                     if(err){
//                                         console.log("Error in db" + err);
//                                     }
//                                     else{
//                                         console.log("Success insert UserData");
//
//                                     }
//                                 });
//                             }
//                         });
//
//
//
//
//
//
//
//











//Starting Server
if(settings.online){
    console.log("HTTPS Started with port: " + settings.port);
    https.createServer(options, app).listen(settings.port);
}
else{
    console.log("HTTP Started with port: " + settings.port);
    app.listen(settings.port);
}
