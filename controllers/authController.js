const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// ...

// User registration
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    req.login(user, err => {
      if (err) return next(err);
      return res.redirect('/'); // Redirect after successful registration
    });
  } catch (err) {
    console.error(err);
    res.redirect('/register'); // Redirect to registration page with error message
  }
});

// User login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',     // Redirect after successful login
  failureRedirect: '/login' // Redirect if login fails
}));

// Logout user
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email']
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: `/users`,
    failureRedirect: '/'
  }
));

module.exports = router;
