const Party = require('../models/Party');

// Create a new party
exports.createParty = async (req, res) => {
  try {
    const newParty = new Party({
      name: req.body.name,
      adventurers: req.body.adventurers,
      // ...other properties
    });
    const savedParty = await newParty.save();
    res.status(201).json(savedParty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating party' });
  }
};

// Get all parties
exports.getAllParties = async (req, res) => {
  try {
    const parties = await Party.find().populate('adventurers');
    res.status(200).json(parties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching parties' });
  }
};

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
exports.deleteParty = async (req, res) => {
  try {
    const deletedParty = await Party.findByIdAndDelete(req.params.id);
    if (!deletedParty) {
      return res.status(404).json({ message: 'Party not found' });
    }
    res.status(200).json({ message: 'Party deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting party' });
  }
};
