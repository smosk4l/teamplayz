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
router.get("/:id", getSingleMeeting);
router.post("/", setMeeting);
router.put("/:id", updatedMeeting);
router.delete("/:id", deleteMeeting);
router.post("/:id/addUser", addUserToMeeting);
router.get("/:id/attendees", getAttendeesOfMeeting);

module.exports = router;
