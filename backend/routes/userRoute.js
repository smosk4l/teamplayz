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
  updateProfile,
} = require('../controllers/userController.js');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/getAuth', checkAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});
router.route('/:id').put(updateUser).delete(deleteUser);
router.get('/activate/:code', authorizeUser);
router.post('/update', upload.single('photo'), updateUser); // Dodaj nowy endpoint do przesyłania plików
router.post('/image/add', updatePhoto);
// router.put('/update/profile', updateProfile);
module.exports = router;
