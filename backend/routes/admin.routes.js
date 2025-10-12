const express=require('express');
const { addRoom, getRooms, addStudentToRoom, getStudents,updateStudentFees } = require('../controlers/admin.con');

route=express.Router();

route.get('/',(req,res)=>{
    res.send('User Route is working');
});

route.post('/add-room', addRoom);
route.get('/get-rooms', getRooms);
route.post('/add-student-to-room', addStudentToRoom);
route.get('/get-students', getStudents);
route.put('/update-student-fees/:id', updateStudentFees);



module.exports=route;