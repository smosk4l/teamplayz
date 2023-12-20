const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/getToken');
const sendEmail = require('../middleware/sendEmailAPI');
const uuid = require('uuid');
const Joi = require('joi');

// Joi schema for user registration
const registerUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updatePhoto = asyncHandler(async (req, res) => {
  try {
    const { userId, name } = req.body;
    const photo = req.file;

    const photoData = photo.buffer;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.photo = photoData;
    user.firstName = name || user.firstName;

    await user.save();

    return res.status(200).json({ message: 'User photo updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  try {
    // Validate request body using Joi schema
    const validationResult = registerUserSchema.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      return res.status(400).json({ message: 'Validation error', errors: validationResult.error.details });
    }

    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const activationCode = uuid.v4();

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      activationCode,
      photo: undefined,
    });

    if (user) {
      const emailResult = await sendEmail(email);
      return res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      return res.status(400).json({ error: 'Invalid User Data' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.isAuthorized) {
      const token = generateToken(user._id);

      return res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user.id,
        });
    } else {
      return res.status(401).json({
        message:
          'Account not activated. Please activate your account via email.',
      });
    }
  } else {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    return res.json({ message: 'User deleted' });
  } else {
    return res.status(404).json({ error: 'User not found' });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  } else {
    return res.status(404).json({ error: 'User not found' });
  }
});

const authorizeUser = asyncHandler(async (req, res) => {
  try {
    const activationCode = req.params.code;

    const user = await User.findOne({ activationCode });

    if (!user) {
      return res.status(404).send('Użytkownik nie został znaleziony.');
    }

    user.isAuthorized = true;
    await user.save();

    return res.status(200).send('Konto zostało pomyślnie aktywowane.');
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = {
  authorizeUser,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  updatePhoto,
};
