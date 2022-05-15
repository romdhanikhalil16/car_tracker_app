const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({
      status: "fail",
      message: "fill the form please",
    });
  }

  const userExist = await User.findOne({ username });
  if (userExist) {
    res.status(400).json({
      status: "fail",
      message: "user already exists",
    });
  }

  const newUser = await User.create({
    username,
    password,
    email,
  });

  if (newUser) {
    res.status(201).json({
      status: "success",
      token: generateToken(newUser._id),
      data: newUser,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

//login

exports.login = async (req, res) => {
  const { password, username } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "fail",
      message: "provide your username and password please",
    });
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(400).json({
      status: "fail",
      message: "check your informations",
    });
  }
  const token = generateToken(user._id);

  return res.status(201).json({
    status: "success",
    token,
    username,
  });
};
