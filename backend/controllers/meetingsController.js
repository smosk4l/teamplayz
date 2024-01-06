const asyncHandler = require('express-async-handler');
const Meeting = require('../models/meetingModel');
const User = require('../models/userModel');
const geolib = require('geolib');
const Joi = require('joi');
const createMeetingSchema = Joi.object({
  owner: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  time: Joi.string().required(),
  date: Joi.date().required(),
  password: Joi.string().required().allow(''),
  attendeesSlots: Joi.number().required(),
  tag: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  city: Joi.string().required(),
  private: Joi.boolean(),
  duration: Joi.number().required(),
});

const updateMeetingSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  time: Joi.string().optional(),
  date: Joi.date().required(),
  attendeesSlots: Joi.number().optional(),
  tag: Joi.string().optional(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  city: Joi.string().required(),
  private: Joi.boolean().required(),
});

const enterPrivateMeetingSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const getSingleMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) {
    return res.status(404).json({ message: 'Meeting not found' });
  }
  const { owner, title, description, time, location, private, attendees, tag } =
    meeting;
  const attendeesSlots = meeting.attendeesSlots;
  return res.status(200).json({
    meeting: {
      tag,
      owner,
      title,
      description,
      time,
      private,
      location,
      attendees,
      attendeesSlots,
    },
  });
});

// const getPublicMeetings = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;

//   try {
//     const options = {
//       page: parseInt(page, 10),
//       limit: parseInt(limit, 10),
//     };

//     const result = await Meeting.paginate({ private: false }, options);

//     return res.status(200).json(result.docs);
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

const getPublicMeetings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.body;

  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const result = await Meeting.paginate({ private: false }, options);

    const totalMeetings = await Meeting.countDocuments({ private: false });

    return res.status(200).json({ meetings: result.docs, totalMeetings });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const createMeeting = asyncHandler(async (req, res) => {
  try {
    // Validate request body using Joi schema
    const validationResult = createMeetingSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationResult.error.details,
      });
    }

    const currentDate = new Date();
    const timeString = currentDate.toLocaleTimeString();
    req.body.time = timeString;

    const meeting = new Meeting({
      owner: req.body.owner,
      title: req.body.title,
      tag: req.body.tag,
      description: req.body.description,
      time: req.body.time,
      date: req.body.date,
      duration: req.body.duration,
      password: req.body.password || '',
      attendees: [req.body.owner],
      private: req.body.private,
      attendeesSlots: req.body.attendeesSlots,
      lat: req.body.lat,
      lng: req.body.lng,
      city: req.body.city,
    });

    const savedMeeting = await meeting.save();
    return res.status(200).json({
      message: 'Meeting added',
      meeting: savedMeeting,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const updatedMeeting = asyncHandler(async (req, res) => {
  try {
    // Validate request body using Joi schema
    const validationResult = updateMeetingSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationResult.error.details,
      });
    }

    const { id } = req.params;
    const {
      title,
      description,
      date,
      time,
      duration,
      private,
      attendeesSlots,
      tag,
      lng,
      lat,
      city,
    } = req.body;
    const meeting = await Meeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    meeting.title = title || meeting.title;
    meeting.description = description || meeting.description;
    meeting.time = time || meeting.time;
    meeting.location = location || meeting.location;
    meeting.attendeesSlots = attendeesSlots || meeting.attendeesSlots;
    meeting.tag = tag || meeting.tag;
    meeting.date = date || meeting.date;
    meeting.duration = duration || meeting.duration;
    meeting.private = private || meeting.private;
    meeting.lng = lng || meeting.lng;
    meeting.lat = lat || meeting.lat;
    meeting.city = city || meeting.city;
    const updatedMeeting = await meeting.save();
    return res.status(200).json({
      message: 'Meeting updated',
      meeting: updatedMeeting,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const deleteMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const meeting = await Meeting.findById(id);
  if (!meeting) {
    return res.status(404).json({ message: 'Meeting not found' });
  }
  await Meeting.deleteOne(meeting);
  return res.status(200).json({ message: 'Meeting removed' });
});

const addUserToMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const meeting = await Meeting.findById(id);
  if (!meeting) {
    return res.status(404).json({ message: 'Meeting not found' });
  }
  if (meeting.attendees.includes(userId)) {
    return res
      .status(400)
      .json({ message: 'User already attending the meeting' });
  }
  if (meeting.attendees.length >= meeting.attendeesSlots) {
    return res.status(400).json({ message: 'Meeting is already full' });
  }
  meeting.attendees.push(userId);
  await meeting.save();
  return res.status(200).json({ message: 'User added to the meeting' });
});

const getAttendeesOfMeeting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const meeting = await Meeting.findById(id).populate('attendees', '-password');
  if (!meeting) {
    return res.status(404).json({ message: 'Meeting not found' });
  }
  return res.status(200).json({ attendees: meeting.attendees });
});

const getAllMeetings = asyncHandler(async (req, res) => {
  const { tag } = req.query;
  const meetings = tag ? await Meeting.find({ tag }) : await Meeting.find();
  if (meetings.length === 0) {
    return res.status(404).json({ message: 'Meetings not found' });
  }
  return res.status(200).json(meetings);
});

const getMeetingsByOwner = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const meetings = await Meeting.find({ owner: userId });
    if (meetings.length === 0) {
      return res.status(404).json({ message: 'Meetings not found' });
    }
    return res.status(200).json(meetings);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

const getUserMeetings = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const meetings = await Meeting.find({ attendees: userId });
    if (meetings.length === 0) {
      return res.status(404).json({ message: 'Meetings not found' });
    }
    return res.status(200).json(meetings);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

const getNewestMeetings = asyncHandler(async (req, res) => {
  const { time } = req.query;
  const meetings = time
    ? await Meeting.find({ time }).sort({ time: 1 })
    : await Meeting.find().sort({ time: 1 });
  if (meetings.length === 0) {
    return res.status(404).json({ message: 'Meetings not found' });
  }
  return res.status(200).json(meetings);
});

const enterPrivateMeeting = asyncHandler(async (req, res) => {
  try {
    // Validate request body using Joi schema
    const validationResult = enterPrivateMeetingSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationResult.error.details,
      });
    }

    // Rest of the code for enterPrivateMeeting...
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const getMeetingsByDistance = asyncHandler(async (req, res) => {
  try {
    // Check if req.body contains the expected properties
    if (!req.body || !req.body.latitude || !req.body.longitude) {
      return res.status(400).json({ error: 'No user coordinates provided' });
    }

    // User coordinates
    const userCoordinates = {
      latitude: parseFloat(req.body.latitude), // Convert to number
      longitude: parseFloat(req.body.longitude), // Convert to number
    };

    // Get all meetings
    const meetings = await Meeting.find({ private: false });

    // Map meetings to objects with distances
    const meetingsWithDistances = meetings.map((meeting) => {
      const meetingCoordinates = {
        latitude: parseFloat(meeting.lat),
        longitude: parseFloat(meeting.lng),
      };

      // Calculate distance between the meeting and the user
      const distance = geolib.getDistance(userCoordinates, meetingCoordinates);

      // Include only meetings within 10 km range
      if (distance <= 10000) {
        // Assuming 10 km is your desired range in meters
        return {
          meeting: {
            ...meeting._doc,
          },
          distance,
        };
      } else {
        return null; // Exclude meetings outside the range
      }
    });

    // Remove null values (meetings outside the range)
    const validMeetings = meetingsWithDistances.filter(
      (meeting) => meeting !== null
    );

    // Sort valid meetings by distance
    validMeetings.sort((a, b) => a.distance - b.distance);

    // Return sorted meetings
    return res.status(200).json(validMeetings);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
const getMarkerPoints = asyncHandler(async (req, res) => {
  try {
    const publicMeetings = await Meeting.find({ private: false });

    const publicMeetingsWithDetails = publicMeetings.map((meeting) => {
      const { id, title, time, tag, attendeesSlots, lng, lat } = meeting;
      return {
        id,
        lng,
        lat,
        title,
        time,
        tag,
        attendeesSlots,
      };
    });

    return res.status(200).json(publicMeetingsWithDetails);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {
  getNewestMeetings,
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
  getMeetingsByDistance,
  getMarkerPoints,
};
