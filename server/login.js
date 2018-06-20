"use strict";

var settings = require("./settings.json");
var sha256 = require("sha256");

const sqlite3 = require('sqlite3').verbose();

exports.loginAttempt = function(user, pass){
    console.log("User: "+ sha256(user));
}
