const express = require("express");
const router = express.Router();
const {
  getSingleMeeting,
  setMeeting,
  updatedMeeting,
  deleteMeeting,
  getAllMeetings,
  getPublicMeetings,
} = require("../controllers/meetingsController");
router.route("/allMeetings").get(getAllMeetings);
router.route("/public").get(getPublicMeetings);
router.route("/:id").get(getSingleMeeting);
router.route("/createMeeting").post(setMeeting);
router.route("/:id").delete(deleteMeeting).put(updatedMeeting);

module.exports = router;
