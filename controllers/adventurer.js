// const Adventurer = require('../models/Adventurer');

// // Create a new adventurer
// exports.createAdventurer = async (req, res) => {
//   try {
//     const newAdventurer = new Adventurer({
//       name: req.body.name,
//       class: req.body.class,
//       race: req.body.race,
//       role: req.body.role,
//       // ...other properties
//     });
//     const savedAdventurer = await newAdventurer.save();
//     res.status(201).json(savedAdventurer);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating adventurer' });
//   }
// };

// // Get all adventurers
// exports.getAllAdventurers = async (req, res) => {
//   try {
//     const adventurers = await Adventurer.find();
//     res.status(200).json(adventurers);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching adventurers' });
//   }
// };

// // Get a single adventurer by ID
// exports.getAdventurerById = async (req, res) => {
//   try {
//     const adventurer = await Adventurer.findById(req.params.id);
//     if (!adventurer) {
//       return res.status(404).json({ message: 'Adventurer not found' });
//     }
//     res.status(200).json(adventurer);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching adventurer' });
//   }
// };

// // Update an adventurer
// exports.updateAdventurer = async (req, res) => {
//   try {
//     const updatedAdventurer = await Adventurer.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         class: req.body.class,
//         race: req.body.race,
//         role: req.body.role,
//         // ...other properties to update
//       },
//       { new: true } // Return the updated document
//     );
//     if (!updatedAdventurer) {
//       return res.status(404).json({ message: 'Adventurer not found' });
//     }
//     res.status(200).json(updatedAdventurer);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating adventurer' });
//   }
// };

// // Delete an adventurer
// exports.deleteAdventurer = async (req, res) => {
//   try {
//     const deletedAdventurer = await Adventurer.findByIdAndDelete(req.params.id);
//     if (!deletedAdventurer) {
//       return res.status(404).json({ message: 'Adventurer not found' });
//     }
//     res.status(200).json({ message: 'Adventurer deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting adventurer' });
//   }
// };

