// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  roomPreference: {
    type: String,
    enum: ['Single', 'Double', 'Triple'],
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    enum: ['1 Semester', '2 Semesters', '1 Year'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'waitlisted', 'cancelled'],
    default: 'pending'
  },
}
, { timestamps: true }
);

// Model


const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
