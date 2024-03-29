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
  forgetPassword,
  resetPassword,
  checkResetCodeEndpoint,
  getAuth,
} = require('../controllers/userController.js');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/', registerUser);
router.get('/user', getUser), router.post('/login', loginUser);
router.post('/password/forget-password/', forgetPassword);
router.post('/password/check-reset-password/', checkResetCodeEndpoint);
router.post('/password/reset-password', resetPassword);
router.get('/getAuth', checkAuth, getAuth);
router.post('/activate/:code', authorizeUser);
router.post('/image/add', upload.single('photo'), updatePhoto);
router.put('/:id', checkAuth, updateUser);
router.delete('/:id', checkAuth, deleteUser);
module.exports = router;
