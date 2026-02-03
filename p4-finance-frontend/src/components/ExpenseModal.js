import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { expensesAPI } from '../services/api';
import './ExpenseModal.css';

const CATEGORIES = [
  { value: 'food', label: '🍔 Food', type: 'expense' },
  { value: 'transport', label: '🚗 Transport', type: 'expense' },
  { value: 'utilities', label: '💡 Utilities', type: 'expense' },
  { value: 'entertainment', label: '🎬 Entertainment', type: 'expense' },
  { value: 'shopping', label: '🛍️ Shopping', type: 'expense' },
  { value: 'health', label: '🏥 Health', type: 'expense' },
  { value: 'education', label: '📚 Education', type: 'expense' },
  { value: 'salary', label: '💰 Salary', type: 'income' },
  { value: 'freelance', label: '💼 Freelance', type: 'income' },
  { value: 'investment', label: '📈 Investment', type: 'income' },
  { value: 'other', label: '📦 Other', type: 'both' }
];

const ExpenseModal = ({ expense, onClose, onSuccess }) => {
  const isEditing = !!expense;
  
  const [formData, setFormData] = useState({
    title: expense?.title || '',
    amount: expense?.amount || '',
    type: expense?.type || 'expense',
    category: expense?.category || 'food',
    description: expense?.description || '',
    date: expense?.date?.split('T')[0] || new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const filteredCategories = CATEGORIES.filter(
    cat => cat.type === 'both' || cat.type === formData.type
  );

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset category when type changes
    if (name === 'type') {
      const defaultCat = value === 'income' ? 'salary' : 'food';
      setFormData(prev => ({ ...prev, [name]: value, category: defaultCat }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const data = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      if (isEditing) {
        await expensesAPI.update(expense._id, data);
      } else {
        await expensesAPI.create(data);
      }
      
      onSuccess();
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal expense-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Type Toggle */}
            <div className="type-toggle">
              <button
                type="button"
                className={`type-btn ${formData.type === 'expense' ? 'active expense' : ''}`}
                onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
              >
                Expense
              </button>
              <button
                type="button"
                className={`type-btn ${formData.type === 'income' ? 'active income' : ''}`}
                onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
              >
                Income
              </button>
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="e.g., Grocery shopping"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            {/* Amount */}
            <div className="form-group">
              <label className="form-label" htmlFor="amount">Amount (₹)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className={`form-input ${errors.amount ? 'error' : ''}`}
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={handleChange}
              />
              {errors.amount && <span className="form-error">{errors.amount}</span>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label" htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className={`form-input form-select ${errors.category ? 'error' : ''}`}
                value={formData.category}
                onChange={handleChange}
              >
                {filteredCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && <span className="form-error">{errors.category}</span>}
            </div>

            {/* Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-input"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description <span className="optional">(optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                className="form-input form-textarea"
                placeholder="Add notes about this transaction..."
                rows="3"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  {isEditing ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                isEditing ? 'Update' : 'Add Transaction'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExpenseModal;
