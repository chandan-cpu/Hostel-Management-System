const { get } = require('mongoose');
const Room = require('../models/rooms.model')
const Student = require('../models/student.model')
const Booking = require('../models/booking.model')

const addRoom = async (req, res) => {
  try {
    // const newRoom = new Room(req.body);
    const { roomName, price, capacity, status, OccupiedUserName, OccupiedUserId, floor, amenities } = req.body;

    let existRoom = await Room.find({ roomName: roomName });

    if (existRoom.length > 0) {
      return res.status(400).json({ message: "Room already exists" });
    }

    const newRoom = new Room({
      OccupiedUserName,
      OccupiedUserId: null,
      roomName,
      price,
      capacity,
      status,
      floor,
      amenities
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};


const addStudentToRoom = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

const updateStudentFees = async (req, res) => {
  try {
    const { dues } = req.body;

    const updateDues = await Student.findByIdAndUpdate(req.params.id, { dues: dues }, { new: true });
    res.status(200).json(updateDues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const BookingData = async (req, res) => {
  try {
    console.log("Reached at the bookingData");
    const { studentName, email, phone, roomPreference, checkInDate, duration, status } = req.body;

    // Validation
    if (!studentName || !email || !phone || !roomPreference || !checkInDate || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing booking by email
    const existingBooking = await Booking.findOne({ email });
    if (existingBooking) {
      return res.status(400).json({ message: "Booking with this email already exists" });
    }

    // Create new booking
    const newBooking = new Booking({
      studentName,
      email,
      phone,
      roomPreference,
      checkInDate,
      duration,
      status: status || 'pending'
    });

    await newBooking.save();
    console.log("Booking saved successfully");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking
    });

  } catch (error) {
    console.error("Error in bookingData:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try{
    const { status } = req.body;
    const updateStatus = await Booking.findByIdAndUpdate(req.params.id, { status: status }, { new: true });
    res.status(200).json(updateStatus);
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  addRoom,
  getRooms,
  addStudentToRoom,
  getStudents, updateStudentFees,BookingData,getBooking,updateBookingStatus
};
