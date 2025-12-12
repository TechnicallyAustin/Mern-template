const db = require('../db');

exports.getUsers = async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await db.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await db.createUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await db.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await db.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};