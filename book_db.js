var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Booking');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/sign_up', function(req,res){
    var Name = req.body.name;
    var Phone_Number = req.body.num;
    var Email = req.body.email;
    var Quantity = req.body.num_travelers;
    var data = {
        "name": Name,
        "Password":Phone_Number,       
        "email": Email,
        "num_travelers": Quantity,
    }
db.collection('Details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Booking Successfull");       
    });
     return res.redirect('index.html');
})
app.listen(3000);
console.log("server listening at port 3000");              