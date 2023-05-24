const express = require("express");
const router = express.Router();
const {
  getMeeting,
  setMeeting,
  updatedMeeting,
  deleteMeeting,
} = require("../controllers/meetingsController");

router.route("/").get(getMeeting).post(setMeeting);
router.route("/:id").delete(deleteMeeting).put(updatedMeeting);

module.exports = router;
