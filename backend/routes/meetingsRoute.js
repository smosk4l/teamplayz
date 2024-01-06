const express = require('express');
const router = express.Router();

const {
  getMeetingsByDistance,
  getAllMeetings,
  getPublicMeetings,
  getPrivateMeeting,
  getSingleMeeting,
  createMeeting,
  updatedMeeting,
  deleteMeeting,
  addUserToMeeting,
  getAttendeesOfMeeting,
  getMeetingsByOwner,
  getUserMeetings,
  enterPrivateMeeting,
  getMarkerPoints,
} = require('../controllers/meetingsController');
const { checkAuth } = require('../middleware/checkAuth');

router.get('/', getAllMeetings);
router.post('/public', getPublicMeetings);
router.get('/distance', getMeetingsByDistance);
router.get('/byOwner/:id', getMeetingsByOwner);
router.get('/userMeetings/:id', getUserMeetings);
router.post('/createMeeting', createMeeting);
router.post('/enterPrivateMeeting/:id', enterPrivateMeeting);
router.get('/public/single/:id', checkAuth, getSingleMeeting);
router.post('/private/single/:id', checkAuth, getPrivateMeeting )
router.put('/:id', updatedMeeting);
router.delete('/:id', deleteMeeting);
router.get('/:id/attendees', getAttendeesOfMeeting);
router.post('/:id/addUser', addUserToMeeting);
router.get('/marker/points', getMarkerPoints);
// router.post('/pushNotification', pushNotification);

module.exports = router;
