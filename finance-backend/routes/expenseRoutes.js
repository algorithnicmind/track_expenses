const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  deleteMultipleExpenses,
  getSummary,
  getTrends,
  getRecentExpenses
} = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');
const {
  createExpenseValidator,
  updateExpenseValidator,
  expenseIdValidator,
  getExpensesValidator
} = require('../middleware/validators');

// All routes require authentication
router.use(protect);

// Analytics routes (must come before /:id routes)
router.get('/summary', getSummary);
router.get('/trends', getTrends);
router.get('/recent', getRecentExpenses);

// CRUD routes
router
  .route('/')
  .get(getExpensesValidator, getExpenses)
  .post(createExpenseValidator, createExpense)
  .delete(deleteMultipleExpenses);

router
  .route('/:id')
  .get(expenseIdValidator, getExpense)
  .put(updateExpenseValidator, updateExpense)
  .delete(expenseIdValidator, deleteExpense);

module.exports = router;
