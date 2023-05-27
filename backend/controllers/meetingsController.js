//////////////////////////////IMPORTS///////////////////////////////////////
const asyncHandler = require("express-async-handler");
const Meeting = require("../models/meetingModel");

//////////////////////////////GET///////////////////////////////////
/// GET SINGLE MEETING
//  @route GET /api/meetings
//  acces Private
const getSingleMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  console.log("meeting")
  if (meeting) {
    const { owner, title, description, time, location, attendees } = meeting;
    const attendeesCount = attendees.length;
    res.status(200).json({
      meeting: {
        owner,
        title,
        description,
        time,
        location,
        attendeesCount,
      },
    });
  } else {
    res.status(404).json({ message: "Meeting not found" });
  }
});
//  GET ALL MEETINGS
//  @route GET /api/meetings/public
//  acces public
const getAllMeetings = asyncHandler(async (req, res) => {
  const meeting = await Meeting.find();
  if (meeting) {
    res.status(200).json(meeting);
  } else {
    res.status(404).json({ message: "Meeting not found" });
  }
});
/// GET ALL PUBLIC MEETING
//  @route GET /api/meetings/public
//  acces public
const getPublicMeetings = asyncHandler(async (req, res) => {
  const meetings = await Meeting.find({ private: false });
  res.status(200).json(meetings);
});
// GET ALL ACTIVE USER MEETINGS
// @route

//////////////////////////////SET///////////////////////////////////////
//  CREATE NEW MEETING
const setMeeting = asyncHandler(async (req, res) => {
  const { owner, title, description, time, location } = req.body;
  if (!owner || !title || !description || !location) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const meeting = await Meeting.create({
    owner: req.body.owner,
    title: req.body.title,
    description: req.body.description,
    time: req.body.time,
    private: req.body.private,
    attendees: req.body.attendees,
    attendeesCount: req.body.attendeesCount,
    location: req.body.location,
  });
  res.status(200).json(meeting);
});
//@desc SET Meetings
//@route SET /api/meetings
//acces Private

//////////////////////////////UPDATE///////////////////////////////////////
const updatedMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) {
    res.status(400);
    throw new error("Meeting not found");
  }
  const updatedMeeting = await Meeting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedMeeting);
});

//@desc Update Meeting
//@route PUT /api/meetings
//acces Private
//////////////////////////////DELETE///////////////////////////////////////
const deleteMeeting = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "delete meeting" });
});
//@desc Delate Meeting
//@route DELATE /api/meetings
//acces Private

// ADD USER TO MEETING
// @route POST /api/meetings/:id/attendees
// access Private
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

  // Sprawdź, czy użytkownik już jest uczestnikiem spotkania
  if (meeting.attendees.includes(userId)) {
    res.status(400).json({ message: "User is already attending the meeting" });
    return;
  }

  meeting.attendees.push(userId);
  await meeting.save();

  res.status(200).json({ message: "User added to the meeting" });
});
// GET ATTENDEES OF MEETING
// @route GET /api/meetings/:id/attendees
// access Private
const getAttendeesOfMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id).populate(
    "attendees",
    "name email"
  ); // Populacja danych użytkowników

  if (!meeting) {
    res.status(404).json({ message: "Meeting not found" });
    return;
  }

  res.status(200).json({ attendees: meeting.attendees });
});

//////////////////////////////EXPORTS///////////////////////////////////////
module.exports = {
  getSingleMeeting,
  setMeeting,
  updatedMeeting,
  deleteMeeting,
  getAllMeetings,
  getPublicMeetings,
  addUserToMeeting,
  getAttendeesOfMeeting,
};
