const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
    likedParties: [{ type: Schema.Types.ObjectId, ref: 'Party' }],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
