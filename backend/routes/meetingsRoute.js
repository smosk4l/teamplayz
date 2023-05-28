const express = require("express");
const router = express.Router();
const {
  getSingleMeeting,
  setMeeting,
  updatedMeeting,
  deleteMeeting,
  getAllMeetings,
  getPublicMeetings,
  addUserToMeeting,
  getAttendeesOfMeeting,
} = require("../controllers/meetingsController");

router.get("/allMeetings", getAllMeetings);
router.get("/public", getPublicMeetings);
router.get("/single/:id", getSingleMeeting);
router.post("/createMeeting", setMeeting);
router.put("/:id", updatedMeeting);
router.delete("/:id", deleteMeeting);
router.post("/:id/attendees", addUserToMeeting);
router.get("/:id/attendees", getAttendeesOfMeeting);

module.exports = router;
