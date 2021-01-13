const express = require("express");
const ora = require("ora");
const bodyParser = require("body-parser");

const spinner = ora('Loading calculator').start();
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// path: /
app.get("/", function (req, res){
    res.sendFile(__dirname+"/index.html"); //dirname gets the directory path
})
app.post("/", function (req, res){
    console.log(req.body);
    var num1 = Number(req.body.n1);
    var num2 = Number(req.body.n2);
    var result = num1 + num2;
    res.send("The result is "+result);
});

// path: /bmiCalculator
app.get("/bmiCalculator", function (req,res){
    res.sendFile(__dirname+"/bmiCalculator.html");
});
app.post("/bmiCalculator", function (req, res){
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var bmi = weight/(height*height); // m/h^2
    res.send("Your BMI is "+bmi+".");
});

app.listen(3000, function (){
    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'Server running on port 3000';
    }, 1000);
});

