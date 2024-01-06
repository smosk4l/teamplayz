const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/getToken');
const sendEmail = require('../middleware/sendEmail');
const { checkAuth } = require('../middleware/checkAuth');
const uuid = require('uuid');
const Joi = require('joi');
const multer = require('multer');
const update = require('../middleware/upload');
const { first } = require('lodash');

// Joi schema for user registration
const registerUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  photo: Joi.string().optional(),
  dateOfBirth: Joi.string().optional(),
  resetPasswordCode: Joi.string().allow(null).default(null).optional(),
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    console.log(req.body.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Customize the data you want to send in the response
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photo: user.photo, // Include photo if needed
      dateOfBirth: user.dateOfBirth, // Include date of birth if needed
      // Add any other fields you want to include in the response
    };

    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const updatePhoto = asyncHandler(async (req, res) => {
  try {
    const { userId, name } = req.body;
    const photo = req.file;
    console.log(req.file);

    if (!photo) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.photo = photo.buffer;
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
    const validationResult = registerUserSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationResult.error.details,
      });
    }

    const { firstName, lastName, email, password, photo, dateOfBirth, resetPasswordCode } =
      req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const activationCode = uuid.v4();

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      activationCode,
      photo,
      dateOfBirth,
      resetPasswordCode : ""
    });

    if (req.file) {
      user.photo = req.file.buffer;
    }

    await user.save();

    const emailResult = await sendEmail(email, activationCode, 'activation');
    return res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photo: user.photo, // Include photo in the response if needed
    });
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
      console.log(token);
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
  try {
    const userIdFromToken = req.user.userId;
    const user = await User.findById(userIdFromToken);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the authenticated user is the owner of the resource
    if (user._id.toString() !== req.params.id) {
      return res.status(403).json({
        message: 'Forbidden: You are not allowed to delete other users',
      });
    }

    await User.deleteOne({ _id: userIdFromToken });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    const userIdFromToken = req.user.userId;

    const user = await User.findById(userIdFromToken);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.email !== email) {
      return res.status(403).json({
        message: 'Forbidden: You are not allowed to update other users',
      });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    const updatedUser = await user.save();

    return res.status(201).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



const forgetPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a unique reset code
    const resetCode = uuid.v4();

    // Save the reset code to the user in the database
    user.resetPasswordCode = resetCode;
    await user.save(); // Check this line to ensure that the user object has resetPasswordCode set

    // Send an email with the reset link containing the reset code
    const emailResult = await sendEmail(email, resetCode, 'passwordReset');
    
    return res.status(200).json({ message: 'Password reset link sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
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

    // Send an email confirming the account activation
    const emailResult = await sendEmail(user.email, activationCode, 'activation');

    return res.status(200).send('Konto zostało pomyślnie aktywowane.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});


const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { resetCode, newPassword } = req.body;

    // Find the user by reset code
    const user = await User.findOne({ resetPasswordCode: resetCode });

    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired reset code' });
    }

    // Update the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.password = hashedPassword;
    user.resetPasswordCode = null; // Reset the reset code after successful password change
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
const checkResetCodeEndpoint = asyncHandler(async (req, res) => {
  try {
    const { resetCode } = req.body;

    // Find the user by reset code
    const user = await User.findOne({ resetPasswordCode: resetCode });

    // Respond with true if the user exists, false otherwise
    return res.status(200).json({ exists: Boolean(user) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {
  getUser,
  authorizeUser,
  checkResetCodeEndpoint,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  updatePhoto,
  resetPassword,
  forgetPassword,
};
