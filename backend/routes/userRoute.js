const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getAuth,
} = require('../controllers/userController.js')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/getAuth', checkAuth, getAuth)
router.route('/:id').put(updateUser).delete(deleteUser)
module.exports = router
