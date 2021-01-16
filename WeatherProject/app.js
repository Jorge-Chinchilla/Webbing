const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

const ora = require('ora');
const spinner = ora('Loading server').start();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res){

    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=4123bb3f7d209d0c0578c9629baf2747&units=" + unit;
    https.get(url, function (response){ //request to the api using the native https node package
        console.log(response.statusCode);

        response.on("data", function (data){
            const weatherData = JSON.parse(data); //converting the data in to a js object
            console.log(weatherData);
            const object = JSON.stringify(weatherData); //converts the object into a string
            const temp = weatherData.main.temp; // getting a specific data from t he nested object
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(temp + " " + description);
            res.write("<p>The weather is currently "+ weatherData.weather[0].description+"</p><br>");
            res.write("<h1>"+temp + " degrees in "+query+"</h1>");
            console.log(imageURL);
            res.write("<img src="+imageURL+">");
            res.send();
        });
    });

});

app.listen(3000, function (){
    setTimeout(() => {
        spinner.color = 'blue';
        spinner.text = 'Server running';
    }, 1000);
});