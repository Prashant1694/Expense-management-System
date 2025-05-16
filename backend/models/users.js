const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  password: {
    type: String,
    // Only required if not a Google-authenticated user
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const userModel = mongoose.model('users', userschema);
module.exports = userModel;