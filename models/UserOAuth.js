const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  picture: String,
});

const UserOAuth = mongoose.model("UserOAuth", userSchema);
module.exports = UserOAuth;
