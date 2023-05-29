const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/getToken");
//@desc Register new user
//@route POST /api/users
//access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@desc Authenticate new user
//@route POST /api/users/login
//access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generowanie tokena JWT
    const token = generateToken(user._id);

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc Delete user
//@route DELETE /api/users/:id
//access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc Update user
//@route PUT /api/users/:id
//access Private
const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAuth = asyncHandler(async (req, res) => {
  res.json("You got the private route");
});

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getAuth,
};
