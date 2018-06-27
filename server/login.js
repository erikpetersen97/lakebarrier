"use strict";

var settings = require("./settings.json");
var sha256 = require("sha256");

const sqlite3 = require('sqlite3').verbose();

exports.loginAttempt = function(user, pass, req, res, callback){


    var db = new sqlite3.Database(settings.dbLocation);
    var sql = "SELECT password FROM LoginData WHERE username = '"+user+"'";

    //Calling Database to get user
     db.all(sql, [], (err,rows) => {
         if(err) {
             console.log("Error: " + err);
         }
         else{
             if(rows.length > 0){
                 rows.forEach((row) =>{
                     if(row.password === sha256(pass)){

                         callback(true, req, res);
                     }
                     else{

                         callback(false, req, res);
                     }
                 });
             }
             else{
                 callback(false, req, res);
             }

         }



});
};
