const { get } = require('mongoose');
const Room = require('../models/rooms.model')
const Student = require('../models/student.model')

const addRoom = async (req, res) => {
  try {
    // const newRoom = new Room(req.body);
    const { roomName, price, capacity, status, OccupiedUserName, OccupiedUserId, floor, amenities } = req.body;

    let existRoom = await Room.findOne({ roomName: roomName });

    if (existRoom) {
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


module.exports = {
  addRoom,
  getRooms,
  addStudentToRoom,
  getStudents, updateStudentFees
};
