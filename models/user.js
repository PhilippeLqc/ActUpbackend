const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  lastname: String,
  firstname: String,
  email: String,
  password: String,
  token: String,
  theatrepiece: [{ type: mongoose.Schema.Types.ObjectId, ref: 'piece' }],
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'role' }],
});

const User = mongoose.model('users', userSchema);

module.exports = User;