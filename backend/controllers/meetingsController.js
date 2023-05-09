const asyncHandler = require("express-async-handler"  );
//@desc Get Meeting
//@route GET /api/meetings
//acces Private
const getMeeting = asyncHandler(async (req, res) => {
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
  res.status(200).json({ message: "set meeting" });
}));
//@desc Update Meeting
//@route PUT /api/meetings
//acces Private
const updateMeeting = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update meeting ${req.params.id}` });
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
