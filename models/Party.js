const mongoose = require('mongoose');
const Schema = mongoose.Schema

const adventurerSchema = new Schema ({
    name: {
        type: String,
        required: false
    },
    class: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    }
})

const partySchema = new Schema ({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    name: { type: String, required: true, unique: true },
    adventurers: [adventurerSchema],
    likes_count: { type: Number, default:1 }
});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
