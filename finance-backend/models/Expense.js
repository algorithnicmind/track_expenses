const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: {
      values: ['income', 'expense'],
      message: 'Type must be either income or expense'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'food',
        'transport',
        'utilities',
        'entertainment',
        'shopping',
        'health',
        'education',
        'salary',
        'freelance',
        'investment',
        'other'
      ],
      message: 'Invalid category'
    }
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 20
  }],
  receipt: {
    type: String,
    default: null
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringFrequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly', null],
    default: null
  }
}, {
  timestamps: true
});

// Compound indexes for common queries
expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ user: 1, type: 1 });
expenseSchema.index({ user: 1, category: 1 });

// Virtual for formatted amount
expenseSchema.virtual('formattedAmount').get(function() {
  return this.amount.toFixed(2);
});

// Static method to get user's expense summary
expenseSchema.statics.getSummary = async function(userId, startDate, endDate) {
  const matchStage = { user: new mongoose.Types.ObjectId(userId) };
  
  if (startDate && endDate) {
    matchStage.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const summary = await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    }
  ]);

  const categoryBreakdown = await this.aggregate([
    { $match: { ...matchStage, type: 'expense' } },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    { $sort: { total: -1 } }
  ]);

  const result = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    incomeCount: 0,
    expenseCount: 0,
    categoryBreakdown: []
  };

  summary.forEach(item => {
    if (item._id === 'income') {
      result.totalIncome = item.total;
      result.incomeCount = item.count;
    } else {
      result.totalExpense = item.total;
      result.expenseCount = item.count;
    }
  });

  result.balance = result.totalIncome - result.totalExpense;
  result.categoryBreakdown = categoryBreakdown.map(cat => ({
    category: cat._id,
    total: cat.total,
    count: cat.count,
    percentage: result.totalExpense > 0 
      ? ((cat.total / result.totalExpense) * 100).toFixed(1)
      : 0
  }));

  return result;
};

// Static method to get monthly trends
expenseSchema.statics.getMonthlyTrends = async function(userId, months = 6) {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  const trends = await this.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          type: '$type'
        },
        total: { $sum: '$amount' }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ]);

  return trends;
};

module.exports = mongoose.model('Expense', expenseSchema);
