const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone_number: String,
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
