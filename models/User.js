const mongoose = require('mongoose');

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
}, {
    timestamps: true
});


const User = model('User', userSchema);

module.exports = User;
