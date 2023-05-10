const mongoose = require("mongoose");
const meetingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a text value"],
    },
    description: {
      type: String,
      required: [true, "Please add a text value"]
    },
    time: {
      type: Date,
      required: [true, "Please add a date value"],
    },
    location: {
      type: String,
      required: [true, "Please add a date value"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Meeting", meetingSchema);
