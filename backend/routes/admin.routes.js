const express=require('express');
const { addRoom, getRooms, addStudentToRoom, getStudents, updateStudentFees, BookingData, getBooking, updateBookingStatus, getFinanceData, updatePaymentStatus, getFinancialSummary, exportFinanceReport, runOverdueCheck, generateMonthlyPayments } = require('../controlers/admin.con');
const {createOrUpdateRoom, showRooms, UpdateRoom, deleteRoom} = require('../controlers/adminmanag.con');
const {getPendingRequests}=require('../controlers/getPendingRequest')
const {approveOrRejectByRoomNumber}=require('../controlers/getPendingRequest');
const { addStaff, getStaff, updateStaff ,deleteStaff} = require('../controlers/Staff.controller');

route=express.Router();

route.get('/',(req,res)=>{
    res.send('User Route is working');
});

route.post('/create', createOrUpdateRoom);

route.get('/rooms', showRooms);

route.delete('/rooms/:roomId', deleteRoom);

route.put('/rooms/:hostelName/:roomNumber', UpdateRoom);

route.get('/pending-requests', getPendingRequests);
route.post('/approve-reject', approveOrRejectByRoomNumber);
route.post('/add-staff', addStaff);
route.get('/get-staff', getStaff);
route.put('/update-staff/:id', updateStaff);
route.delete('/delete-staff/:id', deleteStaff);



module.exports=route;