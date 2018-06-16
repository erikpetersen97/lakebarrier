"use strict";

const express = require('express');
const router = express.Router();
const axios = require('axios');

var settings = require("./settings.json");



router.post("/login", function (req,res) {
    console.log(req);
    res.write("Login Attempt Success");
});


module.exports = router;
