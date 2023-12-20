const express = require('express');
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
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/getAuth', checkAuth, (req, res) => {
    res.status(200).json({ user: req.user });
  });
router.route('/:id').put(updateUser).delete(deleteUser);
router.get('/activate/:code', authorizeUser);
router.post('/update', checkAuth, updateUser); // Dodaj nowy endpoint do przesyłania plików
router.post('/image/add', updatePhoto);
module.exports = router;
