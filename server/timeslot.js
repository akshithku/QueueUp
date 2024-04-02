const mongoose = require("mongoose");

const Doc_Schema = require("./UserSchema");

const User_schema = require("./appModal");

const doctorBookingSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Doc_Schema,
  },
  TimeValue: {
    timing: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User_schema,
  },
});

const DoctorBooking = mongoose.model("DoctorBooking", doctorBookingSchema);

module.exports = DoctorBooking;
