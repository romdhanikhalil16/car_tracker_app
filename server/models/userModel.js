const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"],
  },
  email: { type: String, required: [true, "email is required"] },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  createdAt: { type: Date, default: Date.now },
  telnumber: { type: String },
  age: { type: String },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
