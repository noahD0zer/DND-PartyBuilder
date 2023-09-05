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

// Create Adventurer
router.post("/:id", checkLogin, (req,res) => {
  Party.findById(req.params.id)
       .then(party => {
        if (req.user.id == party.owner) {
          party.adventurers.push(req.body)
          return party.save()
        } else {
          return
        }
       })
       .then((data) => {
        if (data) {
          res.redirect('back')
        } else {
          res.redirect("/error")
        }  
       })
       .catch(err => {
        console.log(err)
       })
})

//patch
router.patch("/:id", checkLogin, (req,res) => {
  Party.findById(req.params.id)
       .then(party => {
        if (req.user.id == party.owner) {
          var changingAdventurer = party.adventurers.id(req.body.memberId)
          changingAdventurer.Name = req.body.Name
          changingAdventurer.Race = req.body.Race
          changingAdventurer.Class = req.body.Class
          changingAdventurer.Role = req.body.Role
          return party.save()
        } else {
          return
        }
       })
       .then((data) => {
        if (data) {
          res.redirect('back')
        } else {
          res.redirect('/error')
        }
       })
       .catch(err => {
        console.log(err)
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


// Edit
router.get("/:id/edit", checkLogin, (req,res) => {
  Party.findById(req.params.id)
       .then(party => {
        if (req.user.id == party.owner) {
          res.render("parties/edit", {
            user: req.user,
            title: "Edit " + (party.name ? `${party.name}` : "New Party"),
            party 
          })
        } else {
        }
       })
       .catch(err => {
        console.log(err)
       })
})

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
router.get("/:id/warning", checkLogin, (req,res) => {
  Party.findById(req.params.id)
       .then(party => {
        if (req.user.id == party.owner) {
          res.render('parties/warning', {
            user: req.user,
            party,
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
       .then(party => {
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