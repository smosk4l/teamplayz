const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
    },
    time: {
      type: Date,
      required: true,
      min: Date.now(),
      max: "2025-01-01",
    },
    location: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
      default: false,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    attendeesSlots: {
      type: Number,
      // required: true,
      validate: {
        validator: function (value) {
          return value <= 30;
        },
        message: "Number of attendee slots cannot exceed 30.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
