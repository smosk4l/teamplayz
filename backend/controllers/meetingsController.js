const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Meeting = require("../models/meetingModel");

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
  const { owner, title, description, time, location, attendeesSlots } =
    req.body;
  if (!owner || !title || !description || !location || !attendeesSlots) {
    res.status(400).json({ message: "Please add all required fields" });
    return;
  const { title, description, time, location, tag } = req.body;
  if (!title || !description || !location || !tag) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const meeting = new Meeting({
    owner,
    title,
    description,
    time,
    location,
    attendees: [],
    private: req.body.private,
    attendeesSlots,
  });
  try {
    const savedMeeting = await meeting.save();
    res.status(200).json(savedMeeting);
  } catch (error) {
    res.status(500).json({ message: "Failed to create meeting" });
  }
});

const updatedMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) {
    res.status(404).json({ message: "Meeting not found" });
    return;
  }
  const updatedMeeting = await Meeting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedMeeting);
});

const deleteMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) {
    res.status(404).json({ message: "Meeting not found" });
    return;
  }
  await meeting.remove();
  res.status(200).json({ message: "Meeting deleted" });
});

const addUserToMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);

  if (!meeting) {
    res.status(404).json({ message: "Meeting not found" });
    return;
  }

  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Invalid User ID" });
    return;
  }

  if (meeting.attendees.includes(userId)) {
    res.status(400).json({ message: "User is already attending the meeting" });
    return;
  }

  if (meeting.attendees.length >= meeting.attendeesSlots) {
    res.status(400).json({ message: "Meeting is already full" });
    return;
  }

  meeting.attendees.push(userId);
  meeting.attendeesSlots -= 1;
  await meeting.save();

  res.status(200).json({ message: "User added to the meeting" });
});

const getAttendeesOfMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id).populate(
    "attendees",
    "name email"
  );

  if (!meeting) {
    res.status(404).json({ message: "Meeting not found" });
    return;
  }

  res.status(200).json({ attendees: meeting.attendees });
});

const getUserActiveMeetings = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const meetings = await Meeting.find({ owner: userId });

  if (meetings.length === 0) {
    res.status(404).json({ message: "No active meetings found for the user" });
    return;
  }

  res.status(200).json(meetings);
});

module.exports = {
  getSingleMeeting,
  setMeeting,
  updatedMeeting,
  deleteMeeting,
  getAllMeetings,
  getPublicMeetings,
  addUserToMeeting,
  getAttendeesOfMeeting,
  getUserActiveMeetings,
};
