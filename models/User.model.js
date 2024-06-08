const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  number: {
    type: Number,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
});

const UserModel = mongoose.model("user", userScheme);

module.exports = {
  UserModel,
};
