import React from "react";
import { Bed, Users, Eye, Edit } from "lucide-react";

// Optional: Define colors based on room status
const statusColors = {
  Available: "bg-green-100 text-green-800",
  Occupied: "bg-red-100 text-red-800",
  "Under Maintenance": "bg-yellow-100 text-yellow-800",
};

const RoomCard = ({ room }) => {

  console.log("Room data in RoomCard:", room);

  
  return (
    <div className="card p-6 hover:shadow-md transition-shadow bg-zinc-500 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-black-900/30 rounded-lg">
            <Bed className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {room.roomName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Floor {room.floor} • {room.type || "Standard"}
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[room.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {room.status.replace("-", " ").toUpperCase()}
        </span>
      </div>

      {/* Room Details */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Capacity</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {room.capacity} students
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Occupied</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {room.OccupiedUserName?.filter((n) => n !== "").length || 0}/
            {room.capacity}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Rent</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ₹{room.price}/month
          </span>
        </div>
      </div>

      {/* Occupants */}
      {room.OccupiedUserName?.length > 0 &&
        room.status === "Occupied" && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {room.OccupiedUserName.join(", ")}
              </span>
            </div>
          </div>
        )}

      {/* Amenities */}
      {room.amenities?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Amenities
          </p>
          <div className="flex flex-wrap gap-1">
            {room.amenities.map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <button className="flex-1 btn btn-secondary flex items-center justify-center space-x-1">
          <Eye className="h-4 w-4" />
          <span>View</span>
        </button>
        <button className="flex-1 btn btn-primary flex items-center justify-center space-x-1">
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
