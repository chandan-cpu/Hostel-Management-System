// src/context/RoomContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "../axios.jsx";

// 1️⃣ Create Context
export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
   
  let obj={
    rooms,
    setRooms,
    loading,
    setLoading
  }
  // 2️⃣ Fetch Rooms
     const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/get-rooms");
      console.log("✅ Fetched rooms:", res.data);
      setRooms(res.data);
      
    } catch (err) {
      console.error("❌ Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  // 3️⃣ Add Room
  const addRoom = async (roomData) => {
    try {
      // use the configured axios instance baseURL (http://localhost:3000/api/admin)
      const res = await axios.post('/add-room', roomData);
      if (res.status === 200 || res.status === 201) {
        // backend returns the created room object as res.data
        setRooms((prev) => [...prev, res.data]);
        
      }
      return true;
    } catch (err) {
      console.error("❌ Error adding room:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 4️⃣ Provide values
  return (
    <RoomContext.Provider value={obj}>
      {children}
    </RoomContext.Provider>
  );
};
