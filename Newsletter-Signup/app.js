const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ora = require('ora');
const https = require("https")
const client = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const spinner = ora('Loading server').start();
client.setConfig({apiKey: "3c23636b2a6901d8005888eb28b3d378-us7",  server: "us7",});

app.use(express.static("public")); // we add the folder that we want to keep as static for the resources

app.get("/", function (req, res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function (req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const run = async () => {
        const response = await client.lists.addListMember("77077d757d", {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        });
        console.log(response); // (optional)
    };
    run();
    res.sendFile(__dirname+"/success.html")

/*    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const urlMailChimp = "https://us7.api.mailchimp.com/3.0/lists/77077d757d/members";
    const options = {
        method: "POST",
        auth: "jorgech1:3c23636b2a6901d8005888eb28b3d378-us7"
    }{
    const request = https.request(urlMailChimp, options, function (){
        response.on("data", function (data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();*/
})

app.listen(process.env.PORT || 3000, function (){ //process.env.PORT for heroku
    setTimeout(() => {
        spinner.color = 'blue';
        spinner.text = 'Server running';
    }, 1000);
})

//mail chimp api key 3c23636b2a6901d8005888eb28b3d378-us7
//list id 77077d757d    