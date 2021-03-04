//jshint esversion:6
require('dotenv').config(); //needs to be on the very top
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
//encryption
userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

const User = new mongoose.model('User', userSchema);

////------------ '/' route
app.route('/')
    .get( function (req, res){
        res.render('home');
        }
    );

////------------ '/login route
app.route('/login')
    .get( function (req, res){
            res.render('login');
        }
    )
    .post(function (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        User.findOne({email: username}, function (err, foundUser){
            if(err){
                console.log(err);
            }else{
                if(foundUser){
                    if(foundUser.password === password){
                        res.render('secrets');
                    }else{
                        res.send('incorrect email or password')
                    }
                }else{
                    res.send('incorrect email or password')
                }
            }
        })
    });

////------------ '/register' route
app.route('/register')
    .get( function (req, res){
            res.render('register');
        }
    )
    .post(function (req, res) {
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });
        newUser.save(function (err){
            if(err){
                console.log(err);
            }else{
                console.log('User added');
                res.render('secrets');
            }
        });
    });

app.listen(3000, function () {
    console.log('Server running');
});