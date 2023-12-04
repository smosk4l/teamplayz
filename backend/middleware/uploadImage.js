const router = require('express').Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
let path = require('path')
let UserSchema = require('../models/userModel')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use an absolute path or dynamically create the path based on the current working directory
        const dest = path.join(process.cwd(), 'test-images')
        cb(null, dest)
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using uuid
        const extension = path.extname(file.originalname)
        const uniqueFilename = uuidv4() + extension
        cb(null, uniqueFilename)
    },
})
const fileFilter = (req, photo, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowedFileTypes.includes(photo.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

let upload = multer({ storage, fileFilter })
module.exports = upload
