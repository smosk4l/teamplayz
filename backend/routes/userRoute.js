const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  deleteUser,
  updateUser,
} = require("../controllers/userController.js");

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/me", getMe);
router.delete("/:id", deleteUser);
router.route("/:id").put(updateUser);

module.exports = router;
