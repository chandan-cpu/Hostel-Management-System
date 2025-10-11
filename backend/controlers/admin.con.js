const Room=require('../models/rooms.model')

 const addRoom=async (req, res) => {
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

module.exports = {
  addRoom,
  getRooms
};
