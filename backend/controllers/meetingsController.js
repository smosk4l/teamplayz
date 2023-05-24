//////////////////////////////IMPORTS///////////////////////////////////////
const asyncHandler = require("express-async-handler");
const Meeting = require("../models/meetingModel");

//////////////////////////////GET///////////////////////////////////
/// GET SINGLE MEETING
//  @route GET /api/meetings
//  acces Private
const getSingleMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  if (meeting) {
    res.status(200).json(meeting);
  } else {
    res.status(404).json({ message: "Meeting not found" });
  }
});
//  GET ALL PUBLIC MEETINGS
//  @route GET /api/meetings/public
//  acces public
const getPublicMeetings = asyncHandler(async (req, res) => {
  const meetings = await Meeting.find();
  res.status(200).json(meetings);
});

//////////////////////////////SET///////////////////////////////////////
//  CREATE NEW MEETING
const setMeeting = asyncHandler(async (req, res) => {
  const { user, title, description, time, location } = req.body;
  if (!user || !title || !description || !time || !location) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const meeting = await Meeting.create({
    user: req.body.user,
    title: req.body.title,
    description: req.body.description,
    time: req.body.time,
    private : req.body.private,
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

//////////////////////////////EXPORTS///////////////////////////////////////
module.exports = {
  getSingleMeeting,
  setMeeting,
  updatedMeeting,
  deleteMeeting,
  getPublicMeetings,
};