const asyncHandler = require("express-async-handler"  );
const Meeting = require('../models/meeting')

//@desc Get Meeting
//@route GET /api/meetings
//acces Private
const getMeeting = asyncHandler(async (req, res) => {
  const golas = await Meeting.find()
  res.status(200).json({ message: "get meeting" });
});
//@desc SET Meetings
//@route SET /api/meetings
//acces Private
const setMeeting = asyncHandler((async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const meeting =await Meeting.create({
    text : req.body.text
  })
  res.status(200).json(meeting)
}))
;
//@desc Update Meeting
//@route PUT /api/meetings
//acces Private
const updatedMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id)
  if (!meeting) {
    res.status(400)
    throw new error('Meeting not found')
  }
  const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {new : true})

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
  updateMeeting,
  deleteMeeting,
};
