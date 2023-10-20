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
    var Password = req.body.pass;
    var Email = req.body.email;
    var data = {
        "name": Name,
        "Password":Password,
        "email": Email
    }
db.collection('Login').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Booking Successfull");       
    });
     return res.redirect('./index.html');
                  
})
app.listen(6000);
console.log("server listening at port 6000");