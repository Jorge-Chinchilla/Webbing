const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",
    { useNewUrlParser: true ,
    useUnifiedTopology: true}
    );

const fruitSchema = new mongoose.Schema({
    name: { //validation
        type: String,
        required: [true, "Name is required"]
    },
    rating: { //validation
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review : "Pretty solid fruit"
})

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "Nice fruit"
})
// kiwi.save();
// Fruit.insertMany([kiwi, fruit], function (err){
//     if(err) {
//         console.log(err);
//     }else{
//         console.log("Succesfully saved");
//     }
// });

 const personSchema = new mongoose.Schema({
     name: String,
     age: Number,
     favouriteFruit: fruitSchema
 });

 const Person = mongoose.model("Person", personSchema);

 const pineapple = new Fruit({
    name: "Pineapple",
    rating: 8,
    review: "Nice fruit"
 });
 //pineapple.save();

 const person = new Person({
     name: "Jorge",
     age: 32,
     favouriteFruit: pineapple
 });
person.save();

//********** Reading from the database *****************//

Fruit.find(function (err, fruits){
    if(err){
        console.log(err);
    }else{
        mongoose.connection.close();
        fruits.forEach(function (fruits){
            console.log(fruit.name);

        });
    }
})

Fruit.updateOne({__id: "601c8a82fdccde08208b6dd6"}, {name: "Peach"}, function (err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully updated");
    }
});

Fruit.deleteOne({__id: "601c952a4a259e42509b9158"}, function (err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully deleted");
    }
});
