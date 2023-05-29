const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Meeting = require("../models/meetingModel");
const { protect } = require("../middleware/authMiddleware");

const getSingleMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);

  if (meeting) {
    const { owner, title, description, time, location, attendees } = meeting;
    const attendeesSlots = meeting.attendeesSlots;
    res.status(200).json({
      meeting: {
        owner,
        title,
        description,
        time,
        location,
        attendeesSlots,
      },
    });
  } else {
    res.status(404).json({ message: "Meeting not found" });
  }
});

const getAllMeetings = asyncHandler(async (req, res) => {
  const meetings = await Meeting.find();
  if (meetings) {
    res.status(200).json(meetings);
  } else {
    res.status(404).json({ message: "Meetings not found" });
  }
});

const getPublicMeetings = asyncHandler(async (req, res) => {
  const meetings = await Meeting.find({ private: false });
  res.status(200).json(meetings);
});

const setMeeting = asyncHandler(async (req, res) => {
  const { userId, title, description, time, location, attendeesSlots, tag } =
    req.body;
  if (!userId || !title || !description || !location || !attendeesSlots) {
    res.status(400).json({ message: "Please add all required fields" });
    return;
  }
  const meeting = new Meeting({
    owner: userId,
    title,
    tag,
    description,
    time,
    location,
    attendees: [userId],
    private: req.body.private,
    attendeesSlots,
  });
  console.log(meeting.tag);
  try {
    const savedMeeting = await meeting.save();
    res.status(200).json({ message: "Meeting added", meeting: savedMeeting });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const updatedMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, time, location, attendeesSlots, tag } = req.body;

  const meeting = await Meeting.findById(id);

  if (meeting) {
    meeting.title = title || meeting.title;
    meeting.description = description || meeting.description;
    meeting.time = time || meeting.time;
    meeting.location = location || meeting.location;
    meeting.attendeesSlots = attendeesSlots || meeting.attendeesSlots;
    meeting.tag = tag || meeting.tag;

    const updatedMeeting = await meeting.save();
    res.status(200).json({
      message: "Meeting updated",
      meeting: updatedMeeting,
    });
  } else {
    res.status(404).json({ message: "Meeting not found" });
  }
});

const deleteMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const meeting = await Meeting.findById(id);

  if (meeting) {
    await meeting.remove();
    res.status(200).json({ message: "Meeting removed" });
  } else {
    res.status(404).json({ message: "Meeting not found" });
  }
});

const addUserToMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const meeting = await Meeting.findById(id);

  if (meeting) {
    if (meeting.attendees.includes(userId)) {
      res.status(400).json({ message: "User already attending the meeting" });
    } else if (meeting.attendees.length >= meeting.attendeesSlots) {
      res.status(400).json({ message: "Meeting is already full" });
    } else {
      meeting.attendees.push(userId);
      await meeting.save();
      res.status(200).json({ message: "User added to the meeting" });
    }
  } else {
    res.status(404).json({ message: "Meeting not found" });
  }
});

const getAttendeesOfMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const meeting = await Meeting.findById(id).populate("attendees", "-password");

  if (meeting) {
    res.status(200).json({ attendees: meeting.attendees });
  } else {
    res.status(404).json({ message: "Meeting not found" });
  }
});

module.exports = {
  getAllMeetings,
  getPublicMeetings,
  getSingleMeeting,
  setMeeting,
  updatedMeeting,
  deleteMeeting,
  addUserToMeeting,
  getAttendeesOfMeeting,
};
