const mongoose = require("mongoose");

const Doc_Schema = require("./UserSchema");

const User_schema = require("./appModal");

const doctorBookingSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Doc_Schema,
  },
  slots: [{
    TimeValue: {
      type: String,
    },
    booked: {
      type: Boolean,
      default: false, 
    },
  }],
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User_schema,
    default: null, 
  },
});

const DoctorBooking = mongoose.model("DoctorBooking", doctorBookingSchema);

module.exports = DoctorBooking;
