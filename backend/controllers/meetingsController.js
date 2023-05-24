const asyncHandler = require("express-async-handler");
const Meeting = require("../models/mettingModel");

//@desc Get Meeting
//@route GET /api/meetings
//acces Private
const getMeeting = asyncHandler(async (req, res) => {
  const golas = await Meeting.find();
  res.status(200).json({ message: "get meeting" });
});
//@desc SET Meetings
//@route SET /api/meetings
//acces Private
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
    location: req.body.location,
  });
  res.status(200).json(meeting);
});
//@desc Update Meeting
//@route PUT /api/meetings
//acces Private
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
//@desc Delate Meeting
//@route DELATE /api/meetings
//acces Private
const deleteMeeting = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "delete meeting" });
});

module.exports = {
  getMeeting,
  setMeeting,
  updatedMeeting,
  deleteMeeting,
};
