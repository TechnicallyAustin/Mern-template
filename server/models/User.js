const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, require: true},
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);