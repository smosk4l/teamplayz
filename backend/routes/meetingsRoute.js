const express = require('express');
const router = express.Router();

const {
  getMeetingsByDistance,
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
} = require('../controllers/meetingsController');

router.get('/', getAllMeetings);
router.get('/public', getPublicMeetings);
router.get('/distance', getMeetingsByDistance);
router.get('/byOwner/:id', getMeetingsByOwner);
router.get('/userMeetings/:id', getUserMeetings);
router.post('/createMeeting', createMeeting);
router.post('/enterPrivateMeeting/:id', enterPrivateMeeting);
router.get('/:id', getSingleMeeting);
router.put('/:id', updatedMeeting);
router.delete('/:id', deleteMeeting);
router.get('/:id/attendees', getAttendeesOfMeeting);
router.post('/:id/addUser', addUserToMeeting);

module.exports = router;
