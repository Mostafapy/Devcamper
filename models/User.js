/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

/** Middlewares */
const encryptPassword = require('../middlewares/passwordEncryption');

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please add a name'],
   },
   email: {
      type: String,
      match: [
         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         'Please add a valid email',
      ],
      required: [true, 'Please add an email'],
      unique: true,
   },
   role: {
      type: String,
      enum: ['user', 'publisher'],
      default: 'user',
   },
   password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
   },
   resetPasswordToken: String,
   resetPasswordExpire: Date,
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

// Encrypt password using bycrypt
encryptPassword(UserSchema);

// Sign jwt and return
// eslint-disable-next-line func-names
UserSchema.methods.getSignedJwtToken = function() {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
   });
};
module.exports = mongoose.model('User', UserSchema);
