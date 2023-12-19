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
router.get('/getAuth', checkAuth);
router.route('/:id').put(updateUser).delete(deleteUser);
router.get('/activate/:code', authorizeUser);
router.post('/update', updateUser); // Dodaj nowy endpoint do przesyłania plików
router.post('/image/add', updatePhoto);
module.exports = router;
