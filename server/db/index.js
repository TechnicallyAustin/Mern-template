const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// DB functions
const getAllUsers = async () => User.find();
const getUserById = async (id) => User.findById(id);
const createUser = async (data) => new User(data).save();
const updateUser = async (id, data) => User.findByIdAndUpdate(id, data, { new: true });
const deleteUser = async (id) => User.findByIdAndDelete(id);

module.exports = {
  connectDB,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};