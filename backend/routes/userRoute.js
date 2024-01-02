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
} = require('../controllers/userController.js');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/getAuth', checkAuth);
router.route('/:id').put(updateUser).delete(deleteUser);
router.get('/activate/:code', authorizeUser);
router.post('/image/add', upload.single('photo'), updatePhoto);
router.put('/update/profile', updateUser);
module.exports = router;
