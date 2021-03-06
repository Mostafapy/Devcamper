/* eslint-disable no-return-await */
/* eslint-disable func-names */
/* eslint-disable no-useless-escape */
const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
UserSchema.methods.getSignedJwtToken = function() {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
   });
};

// Match the entered password to the hashed password in the database
UserSchema.methods.matchPassword = async function(enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash token
UserSchema.methods.getResetPasswordToken = function() {
   // Generate Token
   const resetToken = crypto.randomBytes(20).toString('hex');

   // Hash token and reset password token field
   this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

   // Set expire
   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

   return resetToken;
};
module.exports = mongoose.model('User', UserSchema);
