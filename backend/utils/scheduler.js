const cron = require('node-cron');
const { updateOverduePayments, generateMonthlyPayments, calculateFinancialStats } = require('./cronJobs');

/**
 * Initialize all scheduled tasks
 */
const initScheduler = () => {
  console.log('🕒 Initializing scheduler...');

  // Run every day at midnight to check for overdue payments
  cron.schedule('0 0 * * *', async () => {
    console.log('🔄 Running daily overdue payment check...');
    try {
      await updateOverduePayments();
      console.log('✅ Overdue payment check completed');
    } catch (error) {
      console.error('❌ Error in overdue payment check:', error);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata" // Adjust to your timezone
  });

  // Run on 1st of every month at 6:00 AM to generate monthly payments
  cron.schedule('0 6 1 * *', async () => {
    console.log('🔄 Generating monthly payments...');
    try {
      const createdCount = await generateMonthlyPayments();
      console.log(`✅ Generated ${createdCount} monthly payments`);
    } catch (error) {
      console.error('❌ Error generating monthly payments:', error);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  // Run every hour to update financial stats cache (optional optimization)
  cron.schedule('0 * * * *', async () => {
    console.log('🔄 Updating financial statistics...');
    try {
      await calculateFinancialStats();
      console.log('✅ Financial statistics updated');
    } catch (error) {
      console.error('❌ Error updating financial stats:', error);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  console.log('✅ Scheduler initialized successfully');
};

/**
 * Manual trigger functions for testing
 */
const manualTriggers = {
  async checkOverdue() {
    console.log('🔧 Manual trigger: Checking overdue payments...');
    return await updateOverduePayments();
  },

  async generatePayments() {
    console.log('🔧 Manual trigger: Generating monthly payments...');
    return await generateMonthlyPayments();
  },

  async updateStats() {
    console.log('🔧 Manual trigger: Updating financial stats...');
    return await calculateFinancialStats();
  }
};

module.exports = {
  initScheduler,
  manualTriggers
};