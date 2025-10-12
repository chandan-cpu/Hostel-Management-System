import React from 'react'
import axios from '../../axios.jsx';
import { useState } from 'react';
import { X } from 'lucide-react';

// Make FormData controlled by parent: accept onClose prop to notify parent to hide the modal
export const FormData = ({ onClose }) => {
    const [amenityInput, setAmenityInput] = useState("");

    const [occupants, setOccupants] = useState([""]);

    const [roomData, setRoomData] = useState({
        roomName: "",
        price: "",
        capacity: "",
        status: "Available",
        amenities: [],
        floor: "",
        OccupiedUserName: [""],
        // OccupiedUserId: null

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData({ ...roomData, [name]: value });
        if (name === 'capacity') {
            const newCapacity = parseInt(value) || 0;
            setOccupants((prev) => {
                const updated = [...prev];
                if (newCapacity > updated.length) {
                    return [...updated, ...Array(newCapacity - updated.length)];
                }
                else {
                    return updated.slice(0, newCapacity);
                }
            })
        }
    };

    const handleOccupantChange = (index, value) => {
        const updated = [...occupants];
        updated[index] = value;
        setOccupants(updated);
    }

    const handleAddAmenity = () => {
        if (amenityInput.trim() !== "") {
            setRoomData((prev) => ({
                ...prev,
                amenities: [...prev.amenities, amenityInput.trim()],
            }));
            setAmenityInput("");
        }
    };

    const handleRemoveAmenity = (index) => {
        setRoomData((prev) => ({
            ...prev,
            amenities: prev.amenities.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Merge all final data
        const finalData = {
            ...roomData,
            OccupiedUserName:
                roomData.status === "Occupied"
                    ? occupants.slice(0, roomData.capacity)
                    : [""],
        };

        // console.log("Final Room Data Sent to Backend:", finalData);

        try {
            const res = await axios.post("/add-room", finalData);

            if (res.status === 200 || res.status === 201) {
                alert("✅ Room added successfully!");
                // notify parent to close the modal
                if (typeof onClose === 'function') onClose();

                // Reset form
                setRoomData({
                    roomName: "",
                    price: "",
                    capacity: "",
                    status: "Available",
                    amenities: [],
                    floor: "",
                    OccupiedUserName: [""],
                });
                setOccupants([""]);
                setAmenityInput("");
            }
        } catch (err) {
            console.error("❌ Error adding room:", err);
            alert("Failed to add room. Check backend connection or API route.");
        }
    };

    return (
        <div>
            (
            <div className="fixed inset-0 backdrop-blur-sm bg-white/30  flex items-center justify-center z-50">{/* Modal code here */}
                <div className="bg-white rounded-2xl p-6 w-96 shadow-xl relative">
                    <button onClick={() => typeof onClose === 'function' && onClose()} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
                    <h2 className="text-xl font-bold mb-4">Add New Room</h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Room Number</label>
                            <input
                                type="text"
                                name="roomName"
                                value={roomData.roomName}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={roomData.price}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Capacity</label>
                            <input
                                type="number"
                                name="capacity"
                                value={roomData.capacity}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Floor */}
                        <label>Floor:</label>
                        <input
                            type="text"
                            name="floor"
                            value={roomData.floor}
                            onChange={handleChange}
                            className="border p-2 w-full mb-2 rounded"
                            placeholder="Enter floor (e.g. 1st Floor)"
                        />
                        <div>
                            <label className="block text-sm font-medium">Status:</label>
                            <select
                                name="status"
                                value={roomData.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Available">Available</option>
                                <option value="Occupied">Occupied</option>
                                <option value="Partially Occupied">Partially Occupied</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>


                            {/* 👇 Show input boxes only if status = Occupied */}
                            {roomData.capacity > 0 && (roomData.status === "Occupied" || roomData.status === "Partially Occupied") && (
                                <div className="mb-4">
                                    <h3 className="font-semibold mb-2">Enter Occupant Names:</h3>
                                    {occupants.map((name, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder={`Occupant ${index + 1} Name`}
                                            value={name}
                                            onChange={(e) => handleOccupantChange(index, e.target.value)}
                                            className="border p-2 w-full mb-2 rounded"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <label>Amenities:</label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={amenityInput}
                                onChange={(e) => setAmenityInput(e.target.value)}
                                placeholder="Enter an amenity (e.g., WiFi)"
                                className="border p-2 rounded w-full"
                            />
                            <button
                                type="button"
                                onClick={handleAddAmenity}
                                className="bg-green-600 text-white px-3 rounded"
                            >
                                Add
                            </button>
                        </div>
                        {/* Show amenities */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {roomData.amenities.map((item, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                                >
                                    {item}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveAmenity(index)}
                                        className="text-red-500 font-bold"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>




                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Save Room
                        </button>
                    </form>

                </div>
            </div>
            )

        </div>
    )
}
