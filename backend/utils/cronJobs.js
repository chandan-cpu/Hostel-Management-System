const Payment = require('../models/payment.model');

/**
 * Update payments to overdue status if past due date
 */
const updateOverduePayments = async () => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to start of day
    
    const result = await Payment.updateMany(
      {
        status: 'pending',
        dueDate: { $lt: currentDate }
      },
      {
        $set: { status: 'overdue' }
      }
    );

    console.log(`Updated ${result.modifiedCount} payments to overdue status`);
    return result;
  } catch (error) {
    console.error('Error updating overdue payments:', error);
    throw error;
  }
};

/**
 * Generate monthly payments for all active bookings
 */
const generateMonthlyPayments = async () => {
  try {
    const Booking = require('../models/booking.model');
    
    // Get all confirmed bookings
    const activeBookings = await Booking.find({ status: 'confirmed' });
    
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const dueDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 15); // Due on 15th of next month
    
    let createdPayments = 0;
    
    for (const booking of activeBookings) {
      // Check if payment already exists for this month
      const existingPayment = await Payment.findOne({
        bookingId: booking._id,
        month: currentMonth
      });
      
      if (!existingPayment) {
        const amount = booking.roomPreference === 'Single' ? 1200 : 
                     booking.roomPreference === 'Double' ? 1500 : 1800;
        
        await Payment.create({
          bookingId: booking._id,
          amount: amount,
          month: currentMonth,
          dueDate: dueDate,
          status: 'pending'
        });
        
        createdPayments++;
      }
    }
    
    console.log(`Generated ${createdPayments} monthly payments`);
    return createdPayments;
  } catch (error) {
    console.error('Error generating monthly payments:', error);
    throw error;
  }
};

/**
 * Calculate financial statistics for dashboard
 */
const calculateFinancialStats = async () => {
  try {
    const payments = await Payment.find().populate('bookingId', 'studentName');
    
    const stats = {
      totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
      totalPaid: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
      totalPending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
      totalOverdue: payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
      paymentCount: payments.length,
      paidCount: payments.filter(p => p.status === 'paid').length,
      pendingCount: payments.filter(p => p.status === 'pending').length,
      overdueCount: payments.filter(p => p.status === 'overdue').length
    };
    
    return stats;
  } catch (error) {
    console.error('Error calculating financial stats:', error);
    throw error;
  }
};

module.exports = {
  updateOverduePayments,
  generateMonthlyPayments,
  calculateFinancialStats
};