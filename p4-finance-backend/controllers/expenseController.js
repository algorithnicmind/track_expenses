const Expense = require('../models/Expense');

// @desc    Get all expenses for user
// @route   GET /api/expenses
// @access  Private
exports.getExpenses = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, type, category, startDate, endDate, search, sort = '-date' } = req.query;

    // Build query
    const query = { user: req.user.id };

    if (type) query.type = type;
    if (category) query.category = category;
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Expense.countDocuments(query);

    // Execute query
    const expenses = await Expense.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: expenses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single expense
// @route   GET /api/expenses/:id
// @access  Private
exports.getExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create expense
// @route   POST /api/expenses
// @access  Private
exports.createExpense = async (req, res, next) => {
  try {
    const { title, amount, type, category, description, date, tags, isRecurring, recurringFrequency } = req.body;

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      type,
      category,
      description,
      date: date || new Date(),
      tags,
      isRecurring,
      recurringFrequency
    });

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
exports.updateExpense = async (req, res, next) => {
  try {
    let expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Update fields
    const allowedUpdates = ['title', 'amount', 'type', 'category', 'description', 'date', 'tags', 'isRecurring', 'recurringFrequency'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        expense[field] = req.body[field];
      }
    });

    await expense.save();

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: expense
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete multiple expenses
// @route   DELETE /api/expenses
// @access  Private
exports.deleteMultipleExpenses = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide expense IDs to delete'
      });
    }

    const result = await Expense.deleteMany({
      _id: { $in: ids },
      user: req.user.id
    });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} expense(s) deleted successfully`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get expense summary/analytics
// @route   GET /api/expenses/summary
// @access  Private
exports.getSummary = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    const summary = await Expense.getSummary(req.user.id, startDate, endDate);

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly trends
// @route   GET /api/expenses/trends
// @access  Private
exports.getTrends = async (req, res, next) => {
  try {
    const { months = 6 } = req.query;
    
    const trends = await Expense.getMonthlyTrends(req.user.id, parseInt(months));

    // Format trends for chart display
    const formattedTrends = trends.reduce((acc, item) => {
      const key = `${item._id.year}-${String(item._id.month).padStart(2, '0')}`;
      if (!acc[key]) {
        acc[key] = { month: key, income: 0, expense: 0 };
      }
      acc[key][item._id.type] = item.total;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: Object.values(formattedTrends).sort((a, b) => a.month.localeCompare(b.month))
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent expenses
// @route   GET /api/expenses/recent
// @access  Private
exports.getRecentExpenses = async (req, res, next) => {
  try {
    const { limit = 5 } = req.query;

    const expenses = await Expense.find({ user: req.user.id })
      .sort('-date')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: expenses
    });
  } catch (error) {
    next(error);
  }
};
