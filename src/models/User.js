const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String,
  role: String,
  birthday_date: String,
  created_at: Date,
  salary: Number,
});

module.exports = User;
