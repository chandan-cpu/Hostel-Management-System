import React, { useState } from "react";
import axios from '../../axios.jsx';

export default function StudentPopupForm({onClose}) {
//   const [showForm, setShowForm] = useState(false);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    course: "",
    room: "",
    dues: "",
    status: "active",
    avatar: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/add-student-to-room', student)
      const data = await res.data;
      alert("✅ Student added successfully!");
      console.log(data);
      onClose();
      setStudent({
        name: "",
        email: "",
        phone: "",
        year: "",
        course: "",
        room: "",
        dues: "",
        status: "active",
        avatar: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add student");
    }
  };

  return (
    <div className="flex justify-center mt-10">
    

      {/* Popup Modal */}
      {
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30  bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-2xl relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => onClose()}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
              Add New Student
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={student.name}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={student.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />

              <input
                type="text"
                name="year"
                placeholder="Year (e.g. 3rd Year)"
                value={student.year}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />

              <input
                type="text"
                name="course"
                placeholder="Course (e.g. CSE)"
                value={student.course}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />

              <input
                type="text"
                name="room"
                placeholder="Room No. (e.g. A-301)"
                value={student.room}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />

              <input
                type="number"
                name="dues"
                placeholder="Pending Dues"
                value={student.dues}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />

              <select
                name="status"
                value={student.status}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <input
                type="text"
                name="avatar"
                placeholder="Avatar URL"
                value={student.avatar}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      }
    </div>
  );
}
