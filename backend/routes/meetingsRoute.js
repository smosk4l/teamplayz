const express = require('express')
const router = express.Router()

const {
    getAllMeetings,
    getPublicMeetings,
    getSingleMeeting,
    setMeeting,
    updatedMeeting,
    deleteMeeting,
    addUserToMeeting,
    getAttendeesOfMeeting,
    getMeetingsByOwner,
    getUserMeetings,
    enterPrivateMeeting,
} = require('../controllers/meetingsController')

router.get('/', getAllMeetings)
router.get('/public', getPublicMeetings)
router.get('/byOwner/:id', getMeetingsByOwner)

router.get('/userMeetings/:id', getUserMeetings)
router.post('/createMeeting', setMeeting)
router.post('/enterPrivateMeeting/:id', enterPrivateMeeting)

router.get('/:id', getSingleMeeting)
router.put('/:id', updatedMeeting)
router.delete('/:id', deleteMeeting)

router.get('/:id/attendees', getAttendeesOfMeeting)
router.post('/:id/addUser', addUserToMeeting)

module.exports = router
