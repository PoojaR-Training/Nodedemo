const mongoose = require("mongoose");
const validator = require("validator");
var schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a name"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter a email address"],
    validate: [validator.isEmail, "Please enter a valid email"],
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    validate: [validator.isStrongPassword, "Enter a strong password"],
    minlength: 4,
    maxlength: 10
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passowrd are not same",
    },
  },
});

const User = mongoose.model("user", schema);

module.exports = User;
