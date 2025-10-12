const express=require('express');
const { addRoom, getRooms, addStudentToRoom, getStudents,updateStudentFees, BookingData, getBooking,updateBookingStatus } = require('../controlers/admin.con');

route=express.Router();

route.get('/',(req,res)=>{
    res.send('User Route is working');
});

route.post('/add-room', addRoom);
route.get('/get-rooms', getRooms);
route.post('/add-student-to-room', addStudentToRoom);
route.get('/get-students', getStudents);
route.put('/update-student-fees/:id', updateStudentFees);
route.post('/booking', BookingData);
route.get('/booking-data', getBooking);
route.patch('/booking-status/:id', updateBookingStatus);



module.exports=route;