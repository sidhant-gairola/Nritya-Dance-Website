const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance');
const port = 80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String 
});
var Contact = mongoose.model('Contact', contactSchema);


// Express specific content
app.use("/static",express.static('static'));
app.use(express.urlencoded())

//PUG specific content
app.set('view engine','pug')    //set the template engine as PUG
app.set('views',path.join(__dirname,'views'));  //set the views directory

//ENDPOINTS
app.get('/',(reqr,res) => { 
    const params = {message: "hello bro how are you" };
    res.status(200).render('home.pug',params);
}); 

app.get('/membership',(req,res)=>{
    const params = { }; 
    res.status(200).render('membership.pug',params);
})

app.get('/classInfo',(req,res)=>{
    const params = { };  
    res.status(200).render('classInfo.pug',params);
})

app.get('/about',(req,res)=>{
    const params = { };  
    res.status(200).render('about.pug',params);
})

app.get('/services',(req,res)=>{
    const params = { };  
    res.status(200).render('services.pug',params);
})

app.post('/membership',(req,res)=>{
    var myData = new Contact(req.body);    
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    });
    // res.status(200).render('contact.pug');
})

//start the server
app.listen(port,()=>{
    console.log(`Application started successfully on port ${port}`)
});