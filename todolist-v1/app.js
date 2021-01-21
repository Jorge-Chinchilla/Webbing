const express = require("express");
const bodyParser = require("body-parser");
const ora = require('ora');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const spinner = ora('Loading server').start();

//global
var items = ["Buy food", "Play siege", "Sleep"];

app.get("/", function (req, res){
    var today = new Date();
    var options = {weekday: 'long', day: 'numeric', month: 'long'}
    var day= today.toLocaleDateString("en-US", options);
    res.render('list', {kindOfDay: day, newListItems: items});
})

app.post("/", function (req, res){
    var item = req.body.newItem;
    items.push(item);
    res.redirect('/');
})

app.listen(3000, function (){
    setTimeout(() => {
        spinner.color = 'blue';
        spinner.text = 'Running server';
    }, 1000);
});