const { get } = require('mongoose');
const Room = require('../models/rooms.model')
const Student = require('../models/student.model')
const Booking = require('../models/booking.model')
const Payment = require('../models/payment.model')

const addRoom = async (req, res) => {
  try {
    // const newRoom = new Room(req.body);
    const { roomName, price, capacity, status, OccupiedUserName, OccupiedUserId, floor, amenities } = req.body;

    let existRoom = await Room.find({ roomName: roomName });

    if (existRoom.length > 0) {
      return res.status(400).json({ message: "Room already exists" });
    }

    const newRoom = new Room({
      OccupiedUserName,
      OccupiedUserId: null,
      roomName,
      price,
      capacity,
      status,
      floor,
      amenities
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};


const addStudentToRoom = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

const updateStudentFees = async (req, res) => {
  try {
    const { dues } = req.body;

    const updateDues = await Student.findByIdAndUpdate(req.params.id, { dues: dues }, { new: true });
    res.status(200).json(updateDues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const BookingData = async (req, res) => {
  try {
    console.log("Reached at the bookingData");
    const { studentName, email, phone, roomPreference, checkInDate, duration, status } = req.body;

    // Validation
    if (!studentName || !email || !phone || !roomPreference || !checkInDate || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing booking by email
    const existingBooking = await Booking.findOne({ email });
    if (existingBooking) {
      return res.status(400).json({ message: "Booking with this email already exists" });
    }

    // Create new booking
    const newBooking = new Booking({
      studentName,
      email,
      phone,
      roomPreference,
      checkInDate,
      duration,
      status: status || 'pending'
    });

    await newBooking.save();

    const newPayment = await Payment.create({
      bookingId: newBooking._id,
      amount: roomPreference === 'Single' ? 1200 : roomPreference === 'Double' ? 1500 : 1800,
      month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }), // e.g., October 2025
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), // due after 7 days
    });

    console.log("Booking saved successfully");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking
    });

  } catch (error) {
    console.error("Error in bookingData:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updateStatus = await Booking.findByIdAndUpdate(req.params.id, { status: status }, { new: true });
    res.status(200).json(updateStatus);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getFinanceData = async (req, res) => {
  try {
    const payments = await Payment.find().populate('bookingId', 'studentName phone email roomPreference');

    //Calculate total revenue
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const paid = payments.filter(p => p.status === 'paid');
    const pending = payments.filter(p => p.status === 'pending');
    const overdue = payments.filter(p => p.status === 'overdue');

    // Format payments for frontend consumption
    const formattedPayments = payments.map(payment => ({
      id: payment._id,
      studentName: payment.bookingId ? payment.bookingId.studentName : 'Unknown',
      amount: payment.amount,
      status: payment.status,
      month: payment.month,
      dueDate: payment.dueDate,
      paidDate: payment.paidDate
    }));

    const stats = {
      totalRevenue: totalRevenue,
      totalPaid: paid.reduce((sum, p) => sum + p.amount, 0),
      totalPending: pending.reduce((sum, p) => sum + p.amount, 0),
      totalOverdue: overdue.reduce((sum, p) => sum + p.amount, 0),
      paidCount: paid.length,
      pendingCount: pending.length,
      overdueCount: overdue.length
    };

    res.status(200).json({
      success: true,
      payments: formattedPayments,
      stats: stats
    });
  } catch (error) {
    console.error('Error fetching finance data:', error);
    res.status(500).json({ message: error.message });
  }
}

const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['paid', 'pending', 'overdue'].includes(status)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const updateData = { status };
    
    // If marking as paid, set the paid date
    if (status === 'paid') {
      updateData.paidDate = new Date();
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      updateData,
      { new: true }
    ).populate('bookingId', 'studentName phone email roomPreference');

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({
      success: true,
      message: `Payment marked as ${status}`,
      payment: updatedPayment
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: error.message });
  }
}

const getFinancialSummary = async (req, res) => {
  try {
    const { timeRange = 'month' } = req.query;
    
    let startDate = new Date();
    
    // Calculate date range based on timeRange
    switch (timeRange) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 1);
    }

    const payments = await Payment.find({
      createdAt: { $gte: startDate }
    }).populate('bookingId', 'studentName roomPreference');

    // Calculate monthly revenue trend (last 7 months)
    const revenueData = [];
    for (let i = 6; i >= 0; i--) {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - i, 1);
      monthStart.setHours(0, 0, 0, 0);
      
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      monthEnd.setHours(23, 59, 59, 999);

      const monthPayments = await Payment.find({
        createdAt: { $gte: monthStart, $lte: monthEnd },
        status: 'paid'
      });

      const revenue = monthPayments.reduce((sum, p) => sum + p.amount, 0);
      const expenses = Math.floor(revenue * 0.35); // Assuming 35% expenses
      
      revenueData.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        revenue,
        expenses,
        profit: revenue - expenses
      });
    }

    res.status(200).json({
      success: true,
      revenueData,
      summary: {
        totalPayments: payments.length,
        totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
        averagePayment: payments.length > 0 ? payments.reduce((sum, p) => sum + p.amount, 0) / payments.length : 0
      }
    });

  } catch (error) {
    console.error('Error fetching financial summary:', error);
    res.status(500).json({ message: error.message });
  }
}

const exportFinanceReport = async (req, res) => {
  try {
    const { startDate, endDate, format = 'json' } = req.query;
    
    let query = {};
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const payments = await Payment.find(query)
      .populate('bookingId', 'studentName phone email roomPreference checkInDate')
      .sort({ createdAt: -1 });

    const reportData = {
      generatedAt: new Date(),
      totalPayments: payments.length,
      totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
      statusBreakdown: {
        paid: payments.filter(p => p.status === 'paid').length,
        pending: payments.filter(p => p.status === 'pending').length,
        overdue: payments.filter(p => p.status === 'overdue').length
      },
      payments: payments.map(payment => ({
        paymentId: payment._id,
        studentName: payment.bookingId?.studentName || 'N/A',
        studentEmail: payment.bookingId?.email || 'N/A',
        amount: payment.amount,
        status: payment.status,
        month: payment.month,
        dueDate: payment.dueDate,
        paidDate: payment.paidDate,
        roomType: payment.bookingId?.roomPreference || 'N/A'
      }))
    };

    res.status(200).json({
      success: true,
      report: reportData
    });

  } catch (error) {
    console.error('Error generating finance report:', error);
    res.status(500).json({ message: error.message });
  }
}

// Manual cron job triggers for admin
const runOverdueCheck = async (req, res) => {
  try {
    const { manualTriggers } = require('../utils/scheduler');
    const result = await manualTriggers.checkOverdue();
    
    res.status(200).json({
      success: true,
      message: `Updated ${result.modifiedCount} payments to overdue status`,
      result
    });
  } catch (error) {
    console.error('Error running overdue check:', error);
    res.status(500).json({ message: error.message });
  }
}

const generateMonthlyPayments = async (req, res) => {
  try {
    const { manualTriggers } = require('../utils/scheduler');
    const createdCount = await manualTriggers.generatePayments();
    
    res.status(200).json({
      success: true,
      message: `Generated ${createdCount} monthly payments`,
      createdCount
    });
  } catch (error) {
    console.error('Error generating monthly payments:', error);
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  addRoom,
  getRooms,
  addStudentToRoom,
  getStudents, 
  updateStudentFees, 
  BookingData, 
  getBooking, 
  updateBookingStatus,
  getFinanceData,
  updatePaymentStatus,
  getFinancialSummary,
  exportFinanceReport,
  runOverdueCheck,
  generateMonthlyPayments
};
