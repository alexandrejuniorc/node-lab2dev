const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String,
  role: String,
  birthday_date: String,
  salary: Number,
});

module.exports = User;
