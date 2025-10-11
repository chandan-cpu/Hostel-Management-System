const express=require('express');
const { addRoom, getRooms } = require('../controlers/admin.con');

route=express.Router();

route.get('/',(req,res)=>{
    res.send('User Route is working');
});

route.post('/add-room', addRoom);
route.get('/get-rooms', getRooms);

module.exports=route;