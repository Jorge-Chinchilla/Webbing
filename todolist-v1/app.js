const express = require("express");
const bodyParser = require("body-parser");
const ora = require('ora');

const app = express();
app.set('view engine', 'ejs');
const spinner = ora('Loading server').start();

app.get("/", function (req, res){
    var today = new Date();
    var day = "";
    switch (today.getDay()){
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    }
    res.render('list', {kindOfDay: day});
})

app.listen(3000, function (){
    setTimeout(() => {
        spinner.color = 'blue';
        spinner.text = 'Running server';
    }, 1000);
});