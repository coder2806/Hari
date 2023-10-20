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
    var Email = req.body.email;
    var Subject = req.body.subject;
    var Message = req.body.message;
    var data = {
        "name": Name,
        "email": Email,
        "subject":Subject,
        "message": Message,
    }
db.collection('Contact_Info').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Sent Successfull");       
    });
     return res.redirect('index.html');
})
app.listen(3000);
console.log("server listening at port 3000");