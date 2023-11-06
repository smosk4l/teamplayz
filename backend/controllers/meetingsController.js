const asyncHandler = require("express-async-handler");
const Meeting = require("../models/meetingModel");
const User = require("../models/userModel");

const getSingleMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }
  const { owner, title, description, time, location, private, attendees, tag } =
    meeting;
  const attendeesSlots = meeting.attendeesSlots;
  res.status(200).json({
    meeting: {
      tag,
      owner,
      title,
      description,
      time,
      private,
      location,
      attendees,
      attendeesSlots,
    },
  });
});

const getPublicMeetings = asyncHandler(async (req, res) => {
  const meetings = await Meeting.find({ private: false });
  res.status(200).json(meetings);
});

// TODO CHANGE CODE => TIME AND DATE
const createMeeting = asyncHandler(async (req, res) => {
  const {
    owner,
    title,
    description,
    time,
    password,
    location,
    attendeesSlots,
    private,
    tag,
  } = req.body;
  if (
    !owner ||
    !title ||
    !description ||
    !time ||
    !location ||
    !attendeesSlots ||
    !tag
  ) {
    return res.status(400).json({ message: "Please add all required fields" });
  }
  const currentDate = new Date();
  const timeString = currentDate.toLocaleTimeString();
  req.body.time = timeString;
  const meeting = new Meeting({
    owner,
    title,
    tag,
    description,
    time,
    password,
    private,
    location,
    attendees: [owner],
    private: req.body.private,
    attendeesSlots,
  });

  try {
    const savedMeeting = await meeting.save();
    return res.status(200).json({
      message: "Meeting added",
      meeting: savedMeeting,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

const updatedMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, time, location, attendeesSlots, tag } = req.body;
  const meeting = await Meeting.findById(id);
  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }
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
});

const deleteMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const meeting = await Meeting.findById(id);
  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }
  await Meeting.deleteOne(meeting);
  res.status(200).json({ message: "Meeting removed" });
});

const addUserToMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const meeting = await Meeting.findById(id);
  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }
  if (meeting.attendees.includes(userId)) {
    return res
      .status(400)
      .json({ message: "User already attending the meeting" });
  }
  if (meeting.attendees.length >= meeting.attendeesSlots) {
    return res.status(400).json({ message: "Meeting is already full" });
  }
  meeting.attendees.push(userId);
  await meeting.save();
  res.status(200).json({ message: "User added to the meeting" });
});

const getAttendeesOfMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const meeting = await Meeting.findById(id).populate("attendees", "-password");
  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }
  res.status(200).json({ attendees: meeting.attendees });
});

const getAllMeetings = asyncHandler(async (req, res) => {
  const { tag } = req.query;
  const meetings = tag ? await Meeting.find({ tag }) : await Meeting.find();
  if (meetings.length === 0) {
    return res.status(404).json({ message: "Meetings not found" });
  }
  res.status(200).json(meetings);
});

const getMeetingsByOwner = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const meetings = await Meeting.find({ owner: userId });
    if (meetings.length === 0) {
      return res.status(404).json({ message: "Meetings not found" });
    }
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const getUserMeetings = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const meetings = await Meeting.find({ attendees: userId });
    if (meetings.length === 0) {
      return res.status(404).json({ message: "Meetings not found" });
    }
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const getNewestMeetings = asyncHandler(async (req, res) => {
  const { time } = req.query;
  const meetings = time
    ? await Meeting.find({ time }).sort({ time: 1 })
    : await Meeting.find().sort({ time: 1 });
  if (meetings.length === 0) {
    return res.status(404).json({ message: "Meetings not found" });
  }
  res.status(200).json(meetings);
});

const enterPrivateMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password, email } = req.body;
  const meeting = await Meeting.findById(id);
  if (!meeting) {
    return res.status(404).send("Spotkanie nie zostało znalezione.");
  }
  if (password !== meeting.password) {
    return res.status(400).send("Nieprawidłowe hasło.");
  }
  const userToAddToMeeting = await User.findOne({ email });
  if (!userToAddToMeeting) {
    return res
      .status(404)
      .send("Użytkownik o podanym adresie email nie został znaleziony.");
  }
  if (meeting.attendeesSlots <= meeting.attendees.length) {
    return res.status(400).send("Brak wolnych miejsc na spotkaniu.");
  }
  meeting.attendees.push(userToAddToMeeting.id);
  await meeting.save();
  return res.status(200).send("Użytkownik został dodany do spotkania.");
});

module.exports = {
  getAllMeetings,
  getPublicMeetings,
  getSingleMeeting,
  createMeeting,
  updatedMeeting,
  deleteMeeting,
  addUserToMeeting,
  getAttendeesOfMeeting,
  getMeetingsByOwner,
  getUserMeetings,
  enterPrivateMeeting,
};
