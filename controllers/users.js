const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Party = require('../models/Party');

// Ensure user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/google');
};

// Show user profile
router.get('/:id', ensureAuthenticated, (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).render('error', { message: 'User not found' });
      }

      Party.find({ owner: user._id })
        .then(parties => {
          res.render('users/show', { parties, user, title: user.name });
        })
        .catch(err => {
          console.error(err);
          res.status(500).render('error', { message: 'Internal Server Error' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).render('error', { message: 'Internal Server Error' });
    });
});

module.exports = router;
