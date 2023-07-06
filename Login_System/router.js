var express = require('express');
var router = express.Router(); //metho to create router


const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}
const usersInfo = new Map();

//Define routes
//login user: set response when route is matched
router.post('/login', (req, res)=>{
   const { email, password } = req.body;

  // Check if the user exists in the hashmap and the password matches
  if (usersInfo.has(email) && usersInfo.get(email) === password) {
    req.session.user = email; // Create a new session with the user's email
    res.redirect('/route/CineWorld');
  } else {
    res.end('Invalid Username or Password. Go back and try again.');
  }
})

// Define the route for /route/signUpPage
router.post('/signUpPage', (req, res) => {
    const { email, password } = req.body;

    // Check if the email is already registered
    if (usersInfo.has(email)) {
      res.end('User already exists. Please go back and try again with a different email.');
    } else {
      // Add the new user credentials to the data store
      usersInfo.set(email, password);
      res.redirect('/route/login'); // Redirect to the login page
    }
  
  });


// router for movie page
router.get('/CineWorld', (req, res)=>{
    if(req.session.user){
        res.render('CineWorld', {user: req.session.user})
    }else{
        res.send("Unauthorized User");
    }
})

router.get('/login', (req, res) => {
    res.render('logPage'); // Render the signUpPage view
  });
// Define the route for /route/signUpPage
router.get('/signUpPage', (req, res) => {
    res.render('signUpPage'); // Render the signUpPage view
  });


  

//Export router object
module.exports = router;