const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../config/getToken')
const sendEmail = require('../middleware/sendEmailAPI')
const uuid = require('uuid')
const upload = require('../middleware/uploadImage')
const e = require('express')
//@desc Register new user
//@route POST /api/users
//access Public
const updatePhoto = asyncHandler(async (req, res) => {
    const firstName = req.body.name
    const userId = req.body.userId
    const photo = req.file

    const newUserData = {
        firstName,
        userId,
        photo,
    }

    const newUser = new User(newUserData)

    newUser
        .save()
        .then(() => res.json('User Added'))
        .catch((err) => res.status(400).json('Error: ' + err))
})

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(409).json({ error: 'User already exists' })
        return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Activation Code
    const activationCode = uuid.v4()

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        activationCode: activationCode,
    })

    if (user) {
        // Send email after user creation
        const emailResult = await sendEmail(email)
        console.log(emailResult) // You can handle the result as needed

        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        })
    } else {
        res.status(400).json({ error: 'Invalid User Data' })
    }
})
//@desc Authenticate new user
//@route POST /api/users/login
//access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password, isAuthorized } = req.body
    // console.log('isAuthorized:', isAuthorized) // Add this line for debugging
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        if (isAuthorized) {
            // Generowanie tokena JWT
            const token = generateToken(user._id)

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
                })
        } else {
            console.log('Account not authorized') // Add this line for debugging
            res.status(401).json({
                message:
                    'Account not activated. Please activate your account via email.',
            })
        }
    } else {
        console.log('Invalid credentials') // Add this line for debugging
        res.status(400).json({
            message: 'Invalid credentials',
        })
    }
})
//@desc Delete user
//@route DELETE /api/users/:id
//access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.deleteOne()
        res.json({ message: 'User deleted' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
//@desc Update user
//@route PUT /api/users/:id
//access Private
const updateUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const user = await User.findById(req.params.id)

    if (user) {
        user.firstName = firstName || user.firstName
        user.lastName = lastName || user.lastName
        user.email = email || user.email
        if (password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const getAuth = asyncHandler(async (req, res) => {
    res.json('You got the private route')
})
const authorizeUser = asyncHandler(async (req, res) => {
    try {
        const activationCode = req.params.code
        console.log('Activation Code:', activationCode)

        const user = await User.findOne({ activationCode })
        console.log('User Before Update:', user)

        if (!user) {
            return res.status(404).send('Użytkownik nie został znaleziony.')
        }

        // Aktywuj użytkownika (zmień status aktywacji w bazie danych)
        user.isAuthorized = true
        console.log('User After Update:', user)
        await user.save()

        res.status(200).send('Konto zostało pomyślnie aktywowane.')
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = {
    authorizeUser,
    registerUser,
    loginUser,
    deleteUser,
    updateUser,
    getAuth,
    updatePhoto,
}
