const express = require("express");
const router = express.Router();

const {
  getAllMeetings,
  getPublicMeetings,
  getSingleMeeting,
  setMeeting,
  updatedMeeting,
  deleteMeeting,
  addUserToMeeting,
  getAttendeesOfMeeting,
  getMeetingsByOwner,
} = require("../controllers/meetingsController");

router.get("/", getAllMeetings);
router.get("/byOwner/", getMeetingsByOwner);
router.get("/public", getPublicMeetings);
router.get("/:id", getSingleMeeting);
router.get("/:id/attendees", getAttendeesOfMeeting);router.post("/createMeeting", setMeeting);
router.post("/:id/addUser", addUserToMeeting);
router.put("/:id", updatedMeeting);
router.delete("/:id", deleteMeeting);

module.exports = router;
