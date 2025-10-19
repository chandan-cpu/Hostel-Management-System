const express=require('express');
const cors=require('cors');
const connectDB = require('./utils/db');
// const route=require('./routes/user.routes');
const cookieParser=require('cookie-parser');
const adminRoute=require('./routes/admin.routes');
const { initScheduler } = require('./utils/scheduler');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app=express();
const PORT=process.env.PORT || 3000;

// app.use(cors());
// app.use(cors({
//   origin: '*', 
//   // Your React app URL
//    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   // credentials: true
// }));

// const cors = require('cors');

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server or Postman requests
    // Allow any localhost port
    if (/^http:\/\/localhost:\d+$/.test(origin)) {
      return callback(null, true);
    }
    // Block other origins
    return callback(new Error('Not allowed by CORS'), false);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true // enable if using cookies or auth headers
}));

app.use(cookieParser());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api/auth',authRoutes);

app.use('/api/user',userRoutes);

app.use('/api/admin',adminRoute)

// app.use('/api/users',route);

// app.use('/api/form-structure', route);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
    
    // Initialize scheduled tasks
    // initScheduler();
})