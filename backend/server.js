const express=require('express');
const cors=require('cors');
const connectDB = require('./utils/db');
// const route=require('./routes/user.routes');
const cookieParser=require('cookie-parser');
const adminRoute=require('./routes/admin.routes');

const app=express();
const PORT=process.env.PORT || 3000;

app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Your React app URL
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api/admin',adminRoute)

// app.use('/api/users',route);

// app.use('/api/form-structure', route);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})