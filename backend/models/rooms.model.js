const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  OccupiedUserName: { type: [String], default: [""] },
  OccupiedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  roomName: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  floor: { type: String, required: true },
  amenities: { type: [String], default: [] },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Room', RoomSchema);