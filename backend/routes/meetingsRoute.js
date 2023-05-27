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
router.route("/get/allMeetings").get(getAllMeetings);
router.route("/get/public/meetings", getPublicMeetings);
router.route("/:id").get(getSingleMeeting);
router.route("/").post(setMeeting);
router.route("/:id").delete(deleteMeeting).put(updatedMeeting);

module.exports = router;
