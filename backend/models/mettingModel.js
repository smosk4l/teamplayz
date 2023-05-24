const mongoose = require("mongoose");
const meetingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    time: {
      type: Date,
      min: Date.now(),
      max: "2025-01-01",
      required: [true, "Please add a valid date"],
    },
    location: {
      type: String,
      required: [true, "Please add location url"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Meeting", meetingSchema);
