const ora = require('ora'); //terminal throbber
const spinner = ora('Loading server').start();

setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
}, 1000);

const express = require('express');
const app = express();

//what should happen when the browser makes the get request.
app.get("/", function (req, res){
    res.send("<h1>Hello</h1>");
});
app.get("/contact", function (resp, res){
    res.send("<h2>Contact me</h2>")
})

app.listen(3000, function (){
    //ora implementation
    setTimeout(() => {
        spinner.color = 'green';
        spinner.text = 'Running server';
    }, 1000);
});