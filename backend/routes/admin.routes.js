const express=require('express');
const { addRoom, getRooms, addStudentToRoom, getStudents, updateStudentFees, BookingData, getBooking, updateBookingStatus, getFinanceData, updatePaymentStatus, getFinancialSummary, exportFinanceReport, runOverdueCheck, generateMonthlyPayments } = require('../controlers/admin.con');
const {createOrUpdateRoom, showRooms, UpdateRoom, deleteRoom} = require('../controlers/adminmanag.con');
const {getPendingRequests}=require('../controlers/getPendingRequest')
const {approveOrRejectByRoomNumber}=require('../controlers/getPendingRequest')

route=express.Router();

route.get('/',(req,res)=>{
    res.send('User Route is working');
});

// route.post('/add-room', addRoom);
// route.get('/get-rooms', getRooms);
// route.post('/add-student-to-room', addStudentToRoom);
// route.get('/get-students', getStudents);
// route.put('/update-student-fees/:id', updateStudentFees);
// route.post('/booking', BookingData);
// route.get('/booking-data', getBooking);
// route.put('/booking-status/:id', updateBookingStatus);
// route.get('/finance', getFinanceData);
// route.put('/payment/:paymentId/status', updatePaymentStatus);
// route.get('/finance/summary', getFinancialSummary);
// route.get('/finance/export', exportFinanceReport);

// // Manual cron job triggers
// route.post('/finance/check-overdue', runOverdueCheck);
// route.post('/finance/generate-monthly', generateMonthlyPayments);

route.post('/create', createOrUpdateRoom);

route.get('/rooms', showRooms);

route.delete('/rooms/:roomId', deleteRoom);

route.put('/rooms/:hostelName/:roomNumber', UpdateRoom);

route.get('/pending-requests', getPendingRequests);
route.post('/approve-reject', approveOrRejectByRoomNumber);



module.exports=route;