const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a last name'],
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    activationCode: {
      type: String,
    },
    isAuthorized: {
      type: Boolean,
      default: false,
    },
    coordinates: {
      type: [Number], // tablica dwóch liczb (longitude, latitude)
      required: true,
    },
    photo: {
      type: Buffer,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
