const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required..."] },
    email: {
      type: String,
      validate: [validator.isEmail, "Email is valid"],
      required: [true, "email is required..."],
    },
    password: { type: String, required: [true, "password is required.."] },
    phone: { type: String, required: [true, "phone number is requird"] },
    city: { type: String, required: [true, "city number is requird"] },
    state: { type: String, required: [true, "state number is requird"] },
    gender: { type: String, required: [true, "gender number is requird"] },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
