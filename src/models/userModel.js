const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter FirstName"],
  },
  lastName: {
    type: String,
    default: null,
  },
  dob: {
    type: Date,
    required: [true, "Please enter Date of Birth"],
  },
  placeOfBirth: {
    type: String,
    default: null,
  },
  educationalQualifications: {
    type: String,
    default: null,
  },
  PWE: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
