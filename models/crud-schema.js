const mongoose = require("mongoose");
const validator = require("validator");

const crudUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required..."] },
    email: {
      type: String,
      validate: [validator.isEmail, "Email is valid"],
      required: [true, "email is required..."],
    },
    phone: { type: String, required: [true, "password is required.."] },
  },
  { timestamps: true }
);

const Cruduser = mongoose.model("Cruduser", crudUserSchema);
module.exports = Cruduser;
