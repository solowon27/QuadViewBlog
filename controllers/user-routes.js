const express = require('express');
const router = express.Router();
const { User } = require('../models');

//request login page
router.get('/login', async (req, res) => {
  res.render('login');
});

//request signup page
router.get('/sign-up', async (req, res) => {
  res.render('sign-up');
});

// CREATE new user
router.post('/signup', async (req, res) => {
  try {
     await User.create({  //promise to create new user with the following req.body
      username: req.body.username, // Set the username to the username from the request body
      email: req.body.email,
      password: req.body.password,
    });
    
    req.session.save(() => { //save session with new user
      req.session.loggedIn = true;
      req.session.username = req.body.username;

      res.redirect('/dashboard'); // Updated redirect URL
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => { //find user by email and check password
  try {
    const dbUserData = await User.findOne({ //promise to find user by email
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) { //if no user found, return error message
      res.render
        ('login',{ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password); //promise to check password

    if (!validPassword) { //if password is invalid, return error message
      res.render
        ('login',{ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => { //save session with logged in user
      req.session.loggedIn = true; //set session variables for logged in user
      req.session.username = dbUserData.username; 
      req.session.user_id = dbUserData.id;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      res.redirect('/dashboard');
      // res
      //   .status(200)
      //   .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => { //destroy session on logout
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
