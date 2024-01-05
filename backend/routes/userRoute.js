const express = require('express');
const multer = require('multer');
const router = express.Router();
const { checkAuth } = require('../middleware/checkAuth');
const {
  authorizeUser,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  updatePhoto,
  getUser,
} = require('../controllers/userController.js');
const { check } = require('yargs');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get('/', getUser),
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/getAuth', checkAuth);
router.post('/activate/:code', authorizeUser);
router.post('/image/add', upload.single('photo'), updatePhoto);
router.put('/:id', checkAuth, updateUser);
router.delete('/:id', checkAuth, deleteUser);
module.exports = router;
