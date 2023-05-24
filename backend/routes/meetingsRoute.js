const express = require("express");
const router = express.Router();
const {
  getSingleMeeting,
  setMeeting,
  updatedMeeting,
  deleteMeeting,
  getPublicMeetings
} = require("../controllers/meetingsController");

router.route("/:id").get(getSingleMeeting);
router.route("/allMeetings").get(getPublicMeetings);
router.route("/").post(setMeeting);
router.route("/:id").delete(deleteMeeting).put(updatedMeeting);

module.exports = router;
