//jshint esversion:6

//internal node package
const fs = require('fs');
fs.copyFileSync("file1.txt", "file2.txt");

//external npm
const superheroes = require('superheroes');
const supervillains = require('supervillains');
console.log("Superhero fight:")
console.log(superheroes.random()+" vs "+supervillains.random());