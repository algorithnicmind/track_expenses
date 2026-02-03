import React, { useState, useEffect, useCallback } from 'react';
import './Expenses.css';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit2, 
  FiTrash2,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { expensesAPI } from '../services/api';
import ExpenseModal from '../components/ExpenseModal';
import ConfirmModal from '../components/ConfirmModal';
import './Expenses.css';

const CATEGORY_ICONS = {
  food: '🍔',
  transport: '🚗',
  utilities: '💡',
  entertainment: '🎬',
  shopping: '🛍️',
  health: '🏥',
  education: '📚',
  salary: '💰',
  freelance: '💼',
  investment: '📈',
  other: '📦'
};

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    startDate: '',
    endDate: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value)
        )
      };

      const response = await expensesAPI.getAll(params);
      setExpenses(response.data.data);
      setPagination(prev => ({
        ...prev,
        ...response.data.pagination
      }));
    } catch (error) {
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      category: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await expensesAPI.delete(id);
      toast.success('Expense deleted successfully');
      setDeleteConfirm(null);
      fetchExpenses();
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  const handleModalSuccess = () => {
    setShowModal(false);
    setEditingExpense(null);
    fetchExpenses();
    toast.success(editingExpense ? 'Expense updated!' : 'Expense added!');
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingExpense(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="expenses-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-title">
          <h1>Expenses</h1>
          <p>Manage all your income and expenses</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Expense
        </button>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={filters.search}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <button 
          className={`btn btn-secondary filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter /> Filters
        </button>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="filters-expanded">
          <div className="filter-group">
            <label>Type</label>
            <select 
              name="type" 
              value={filters.type} 
              onChange={handleFilterChange}
              className="form-select form-input"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Category</label>
            <select 
              name="category" 
              value={filters.category} 
              onChange={handleFilterChange}
              className="form-select form-input"
            >
              <option value="">All Categories</option>
              {Object.keys(CATEGORY_ICONS).map(cat => (
                <option key={cat} value={cat}>{CATEGORY_ICONS[cat]} {cat}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>From Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="form-input"
            />
          </div>
          <div className="filter-group">
            <label>To Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="form-input"
            />
          </div>
          <button className="btn btn-ghost" onClick={clearFilters}>
            Clear All
          </button>
        </div>
      )}

      {/* Expenses Table */}
      <div className="expenses-table-wrapper">
        {loading ? (
          <div className="table-loading">
            <div className="spinner"></div>
            <p>Loading expenses...</p>
          </div>
        ) : expenses.length > 0 ? (
          <>
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>
                      <div className="transaction-cell">
                        <span className="transaction-icon">
                          {CATEGORY_ICONS[expense.category] || '📦'}
                        </span>
                        <div className="transaction-info">
                          <span className="transaction-title">{expense.title}</span>
                          {expense.description && (
                            <span className="transaction-desc">{expense.description}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{expense.category}</span>
                    </td>
                    <td>{formatDate(expense.date)}</td>
                    <td>
                      <span className={`amount ${expense.type}`}>
                        {expense.type === 'income' ? '+' : '-'}
                        {formatCurrency(expense.amount)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn edit"
                          onClick={() => handleEdit(expense)}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => setDeleteConfirm(expense)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
              <span className="pagination-info">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} entries
              </span>
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                >
                  <FiChevronLeft />
                </button>
                <span className="pagination-pages">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.pages}
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No expenses found</h3>
            <p>Start tracking your finances by adding your first expense</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              <FiPlus /> Add Expense
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <ExpenseModal
          expense={editingExpense}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <ConfirmModal
          title="Delete Expense"
          message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
          confirmText="Delete"
          confirmType="danger"
          onConfirm={() => handleDelete(deleteConfirm._id)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
};

export default Expenses;
