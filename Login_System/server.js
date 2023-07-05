
const express = require('express');
const app = express(); // create express app 
const bodyParser = require("body-parser")


const path = require('path'); //path module 

const port = process.env.PORT||3000; //Port variable

//body parser module: Rsponsible for passing incoming request bodies in the middleware before you use it
app.use(bodyParser.json())
app.use(bodyparser.urlencoded({ extended: true }))

//Initialize view engine
app.set('view engine', 'ejs');

//load static assets(whenever I want to access the css, I will use this static path)
//It returns path of the loginStyle folder to this use method 
app.use('/static', express.static(path.join(__dirname, 'views')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
https://wallpaperaccess.com/full/2000044.png

// home route
app.get('/', (req, res) =>{
    res.render('base', { title : "Login System"});//render html page
})

app.listen(port, ()=>{console.log("Listening to server on http://localhost:3000")})