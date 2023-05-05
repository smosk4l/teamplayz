const express = require("express");
const router = express.Router();
const {
  getMeeting,
  setMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingsController");

router.route("/").get(getMeeting).post(setMeeting);
router.route("/:id").delete(deleteMeeting).put(updateMeeting);

module.exports = router;
