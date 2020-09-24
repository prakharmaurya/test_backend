const mongoose = require("mongoose");
const User = mongoose.model("users", {
  name: String,
  email: String,
  password: String,
});

module.exports = User;
