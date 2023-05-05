//@desc Get Meeting
//@route GET /api/meetings
//acces Private
const getMeeting = (req, res) => {
  res.status(200).json({ message: "get meeting" });
};
//@desc SET Meetings
//@route SET /api/meetings
//acces Private
const setMeeting = (req, res) => {
  res.status(200).json({ message: "set meeting" });
};
//@desc Update Meeting
//@route PUT /api/meetings
//acces Private
const updateMeeting = (req, res) => {
  res.status(200).json({ message: `update meeting ${req.params.id}` });
};
//@desc Delate Meeting
//@route DELATE /api/meetings
//acces Private
const deleteMeeting = (req, res) => {
  res.status(200).json({ message: "delete meeting" });
};

module.exports = {
  getMeeting,
  setMeeting,
  updateMeeting,
  deleteMeeting,
};
