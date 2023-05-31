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
} = require("../controllers/meetingsController");

router.get("/", getAllMeetings);
router.get("/public", getPublicMeetings);
router.post("/createMeeting", setMeeting);

router.get("/:id", getSingleMeeting);
router.put("/:id", updatedMeeting);
router.delete("/:id", deleteMeeting);

router.get("/:id/attendees", getAttendeesOfMeeting);
router.post("/:id/addUser", addUserToMeeting);

module.exports = router;
