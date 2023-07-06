
const express = require('express');
const app = express(); // create express app 
const bodyParser = require('body-parser')

const session = require("express-session");
const{v4:uuidv4} = require("uuid");

const router = require('./router')

const path = require('path'); //path module 


//body parser module: Rsponsible for passing incoming request bodies in the middleware before you use it
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Initialize view engine
app.set('view engine', 'ejs');

//load static assets(whenever I want to access the css, I will use this static path)
//It returns path of the loginStyle folder to this use method 
app.use('/static', express.static(path.join(__dirname, 'views')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))


app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use("/route", router);

// home route
app.get('/', (req, res) =>{
    res.render('logPage', { title : "Login System"});//render html page
})
app.get('/', (req, res) =>{
    res.render('signUp', { title : "Sign Up"});//render html page
})
