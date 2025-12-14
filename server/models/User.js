const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Define User Schema
const UserSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, require: true},
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  date: { type: Date, default: Date.now },
});

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
UserSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);