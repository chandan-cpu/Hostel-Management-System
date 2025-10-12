const mongoose = require("mongoose");



const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
  },
  year: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  room: {
    type: String,
    default: null
  },
  checkIn: {
    type: Date,
    default: null
  },
  checkOut: {
    type: Date,
    default: null
  },
  dues: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'checked-out', 'pending'],
    default: 'pending'
  },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  documents: [{
    type: {
      type: String,
      enum: ['id', 'transcript', 'medical', 'other']
    },
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
studentSchema.index({ email: 1 });
studentSchema.index({ status: 1 });
studentSchema.index({ room: 1 });

module.exports = mongoose.model('Student', studentSchema);