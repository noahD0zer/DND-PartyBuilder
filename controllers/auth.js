const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth authentication route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
  successRedirect: '/parties',
  failureRedirect: '/parties'
  }

));

// Logout user
router.get('/logout', function(req, res) {
  req.logout(function() {
    res.redirect('/parties')
  })
})

module.exports = router;
