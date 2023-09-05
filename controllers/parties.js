const express = require('express');
require('dotenv').config()

const Party = require('../models/Party');
const checkLogin = require('../config/ensureLoggedIn')

const router = express.Router()

//Index
router.get('/', (req, res) => {
  Party.find({})
       .populate("owner")
       .then(parties => {
          res.render("parties/index", {parties, title: "Parties Galore!"})
       })
       .catch(err => {
        console.log(err)
        res.redirect("/error")
       })
  
})
// New Party
router.get("/new", checkLogin, (req, res) => {
  res.render("parties/new", { user: req.user, title: "New Party" })
})

// Create a party
router.post('/', checkLogin, (req, res) => {
  req.body.owner = req.user.id
  Party.create(req.body)
      .then(party => {
          res.redirect(`/parties/${party._id}/edit`)
      })
      .catch(err => {
          console.log(err)
          res.redirect("/error")
      })
})

// Get a single party by ID
exports.getPartyById = async (req, res) => {
  try {
    const party = await Party.findById(req.params.id).populate('adventurers');
    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }
    res.status(200).json(party);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching party' });
  }
};

// Update a party
exports.updateParty = async (req, res) => {
  try {
    const updatedParty = await Party.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        adventurers: req.body.adventurers,
        // ...other properties to update
      },
      { new: true } // Return the updated document
    );
    if (!updatedParty) {
      return res.status(404).json({ message: 'Party not found' });
    }
    res.status(200).json(updatedParty);
  } catch (error) {
    res.status(500).json({ message: 'Error updating party' });
  }
};

// Delete a party
router.delete("/:id/delete", checkLogin, (req, res) => {
  Party.findById(req.params.id)
      .then(party => {
          if (req.user.id == party.owner) {
               return party.deleteOne()
          } else {
              return
          }
      })
      .then(data => {
          if (data) {
              console.log("deleted", data)
              res.redirect(`/users/${data.owner}`)
          } else {
              res.redirect("/error")
          }
      })
      .catch(err => {
          console.log(err)
      })
})

// Delete warning
router.get("/:id/confirm", checkLogin, (req,res) => {
  Party.findById(req.params.id)
       .then(party => {
        if (req.user.id == party.owner) {
          res.render('parties/confirm', {
            user: req.user,
            team,
            title: "You sure about that???"
          })
        } else {
          res.redirect("/error")  
        }
       })
       .catch(err => {
        console.log(err)
      })
})

// Show
router.get("/:id", (req,res) => {
  Party.findById(req.params.id)
       .populate('owner')
       .then(Party => {
          res.render("parties/show", {
            user: req.user,
            title: party.name ? '${party.name}' : "New Party",
            party

          })
       })
       .catch(err => {
          console.log(err)
          res.redirect("/error")
       })
})

module.exports = router;