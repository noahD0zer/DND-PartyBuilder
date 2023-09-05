const mongoose = require('mongoose');
const Schema = mongoose.Schema

const adventurerSchema = new Schema ({
    name: String,
    class: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    role: [String]
})

const partySchema = new Schema ({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    name: { type: String, required: true, unique: true },
    adventurers: [adventurerSchema],
    updoots: Number
  // ...other properties you might need
});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
