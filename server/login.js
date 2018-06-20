"use strict";

var settings = require("./settings.json");
var sha256 = require("sha256");

const sqlite3 = require('sqlite3').verbose();

exports.loginAttempt = function(user, pass){
    console.log("User: "+ sha256(user));

    let db = new sqlite3.Database(settings.dbLocation);
    var date = getCurrentDate();
    let sql = "SELECT * FROM Orders WHERE time_of_order <= datetime('"+date+"', '-600 seconds') AND is_placed = 0 ORDER BY id";

    //Calling Database to get all orders that have waited more then 5min and is not placed yet
    db.all(sql, [], (err,rows) => {
        if(err) {
            console.log("Error: " + err);
        }
        else{
            rows.forEach((row) =>{




}
