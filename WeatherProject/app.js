const express = require("express");
const app = express();
const https = require("https");

const ora = require('ora');
const spinner = ora('Loading server').start();

app.get("/", function (req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=4123bb3f7d209d0c0578c9629baf2747";
    https.get(url, function (response){ //request to the api using the native https node package
        console.log(response.statusCode);
    });
    res.send("Working");
});



app.listen(3000, function (){
    setTimeout(() => {
        spinner.color = 'blue';
        spinner.text = 'Server running';
    }, 1000);
});