const express = require("express");
const bodyParser = require("body-parser");
const ora = require('ora');
const date = require(__dirname+"/date.js");//requiring a model made by us

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const spinner = ora('Loading server').start();

//global
const items = ["Buy food", "Play siege", "Sleep"];
const workItems = [];

app.get("/", function (req, res){
    let day = date.getDate();
    res.render('list', {listTitle: day, newListItems: items});
})

app.post("/", function (req, res){
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect('/work');
    }else{
        items.push(item);
        res.redirect('/');
    }
})

app.get("/work", function (req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.post("/work", function (req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.get("/about", function (req, res){
    res.render("about");
})

app.listen(3000, function (){
    setTimeout(() => {
        spinner.color = 'blue';
        spinner.text = 'Running server';
    }, 1000);
});