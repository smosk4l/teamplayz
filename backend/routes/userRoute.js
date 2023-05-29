const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/checkAuth");
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getAuth,
} = require("../controllers/userController.js");

router.post("/", registerUser);
router.post("/login", loginUser);
router.route("/:id").put(updateUser).delete(deleteUser);
router.get("/getAuth", checkAuth, getAuth);
module.exports = router;
