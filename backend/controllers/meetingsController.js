const asyncHandler = require('express-async-handler')
const Meeting = require('../models/meetingModel')
const User = require('../models/userModel')

///////////// GET SINGLE MEETING
///// ROUTE
const getSingleMeeting = asyncHandler(async (req, res) => {
    const meeting = await Meeting.findById(req.params.id)
    if (meeting) {
        const { owner, title, description, time, location, attendees, tag } =
            meeting
        const attendeesSlots = meeting.attendeesSlots
        res.status(200).json({
            meeting: {
                tag,
                owner,
                title,
                description,
                time,
                location,
                attendees,
                attendeesSlots,
            },
        })
    } else {
        res.status(404).json({ message: 'Meeting not found' })
    }
})

///////////// GET PUBLIC MEETINGS

const getPublicMeetings = asyncHandler(async (req, res) => {
    const meetings = await Meeting.find({ private: false })
    res.status(200).json(meetings)
})
//// CREATE MEETING

const setMeeting = asyncHandler(async (req, res) => {
    const {
        owner,
        title,
        description,
        time,
        password,
        location,
        attendeesSlots,
        tag,
    } = req.body
    const currentDate = new Date() // Tworzy obiekt Date z bieżącą datą i czasem

    // Pobiera godzinę, minutę i sekundę z obiektu Date
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()

    // Formatuje godzinę, minutę i sekundę w postaci ciągu znaków w odpowiednim formacie
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    console.log(timeString) // Wyświetli aktualny czas w formacie "HH:MM:SS"

    req.body.time = timeString
    if (
        !owner ||
        !title ||
        !description ||
        !time ||
        !location ||
        !attendeesSlots ||
        !tag
    ) {
        res.status(400).json({ message: 'Please add all required fields' })
        return
    }
    const meeting = new Meeting({
        owner,
        title,
        tag,
        description,
        time,
        password,
        location,
        attendees: [owner],
        private: req.body.private,
        attendeesSlots,
    })
    try {
        const savedMeeting = await meeting.save()
        res.status(200).json({
            message: 'Meeting added',
            meeting: savedMeeting,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
///// UPDATE MEETING
const updatedMeeting = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, description, time, location, attendeesSlots, tag } = req.body

    const meeting = await Meeting.findById(id)

    if (meeting) {
        meeting.title = title || meeting.title
        meeting.description = description || meeting.description
        meeting.time = time || meeting.time
        meeting.location = location || meeting.location
        meeting.attendeesSlots = attendeesSlots || meeting.attendeesSlots
        meeting.tag = tag || meeting.tag

        const updatedMeeting = await meeting.save()
        res.status(200).json({
            message: 'Meeting updated',
            meeting: updatedMeeting,
        })
    } else {
        res.status(404).json({ message: 'Meeting not found' })
    }
})

//DELETE MEETING

const deleteMeeting = asyncHandler(async (req, res) => {
    const { id } = req.params

    const meeting = await Meeting.findById(id)

    if (meeting) {
        await Meeting.deleteOne(meeting)
        res.status(200).json({ message: 'Meeting removed' })
    } else {
        res.status(404).json({ message: 'Meeting not found' })
    }
})
///// ADD USER TO MEETING
const addUserToMeeting = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    const meeting = await Meeting.findById(id)

    if (meeting) {
        if (meeting.attendees.includes(userId)) {
            res.status(400).json({
                message: 'User already attending the meeting',
            })
        } else if (meeting.attendees.length >= meeting.attendeesSlots) {
            res.status(400).json({ message: 'Meeting is already full' })
        } else {
            meeting.attendees.push(userId)
            await meeting.save()
            res.status(200).json({ message: 'User added to the meeting' })
        }
    } else {
        res.status(404).json({ message: 'Meeting not found' })
    }
})
//// GET ATTENDES OF MEETING

const getAttendeesOfMeeting = asyncHandler(async (req, res) => {
    const { id } = req.params

    const meeting = await Meeting.findById(id).populate(
        'attendees',
        '-password'
    )

    if (meeting) {
        res.status(200).json({ attendees: meeting.attendees })
    } else {
        res.status(404).json({ message: 'Meeting not found' })
    }
})
const getAllMeetings = asyncHandler(async (req, res) => {
    const { tag } = req.query
    let meetings

    if (tag) {
        meetings = await Meeting.find({ tag })
    } else {
        meetings = await Meeting.find()
    }

    if (meetings.length > 0) {
        res.status(200).json(meetings)
    } else {
        res.status(404).json({ message: 'Meetings not found' })
    }
})
const getMeetingsByOwner = asyncHandler(async (req, res) => {
    const userId = req.params.id

    try {
        const meetings = await Meeting.find({ owner: userId })

        if (meetings.length > 0) {
            res.status(200).json(meetings)
        } else {
            res.status(404).json({ message: 'Meetings not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
const getUserMeetings = asyncHandler(async (req, res) => {
    const userId = req.params.id

    try {
        const meetings = await Meeting.find({ attendees: userId })

        if (meetings.length > 0) {
            res.status(200).json(meetings)
        } else {
            res.status(404).json({ message: 'Meetings not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
const getNewestMeetings = asyncHandler(async (req, res) => {
    const { time } = req.query
    let meetings

    if (time) {
        meetings = await Meeting.find({ time }).sort({ time: 1 }) // Sort by time in ascending order
    } else {
        meetings = await Meeting.find().sort({ time: 1 }) // Sort by time in ascending order
    }

    if (meetings.length > 0) {
        res.status(200).json(meetings)
    } else {
        res.status(404).json({ message: 'Meetings not found' })
    }
})

const enterPrivateMeeting = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { password, email } = req.body

    console.log(password)
    const meeting = await Meeting.findById(id)
    const meetingSlots = meeting.attendeesSlots

    password === meeting.password ? res.status(200) : res.status(400)

    console.log(User)

    const userToAddToMeeting = await User.findOne({ email })

    const userToAddToMeetingId = userToAddToMeeting.id
    console.log(userToAddToMeetingId)

    if (meetingSlots > meeting.attendees.length) {
        meeting.attendees.push(userToAddToMeetingId)
    }

    console.log(meeting)
})

module.exports = {
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
}
