import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign, 
  FiArrowRight,
  FiPlus
} from 'react-icons/fi';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { toast } from 'react-toastify';
import { expensesAPI } from '../services/api';
import ExpenseModal from '../components/ExpenseModal';
import './Dashboard.css';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6'];

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

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, trendsRes, recentRes] = await Promise.all([
        expensesAPI.getSummary(),
        expensesAPI.getTrends({ months: 6 }),
        expensesAPI.getRecent(5)
      ]);

      setSummary(summaryRes.data.data);
      setTrends(trendsRes.data.data);
      setRecentExpenses(recentRes.data.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleExpenseAdded = () => {
    setShowModal(false);
    fetchDashboardData();
    toast.success('Expense added successfully!');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card income">
          <div className="card-icon">
            <FiTrendingUp />
          </div>
          <div className="card-content">
            <span className="card-label">Total Income</span>
            <span className="card-value">{formatCurrency(summary?.totalIncome)}</span>
            <span className="card-count">{summary?.incomeCount || 0} transactions</span>
          </div>
        </div>

        <div className="summary-card expense">
          <div className="card-icon">
            <FiTrendingDown />
          </div>
          <div className="card-content">
            <span className="card-label">Total Expenses</span>
            <span className="card-value">{formatCurrency(summary?.totalExpense)}</span>
            <span className="card-count">{summary?.expenseCount || 0} transactions</span>
          </div>
        </div>

        <div className="summary-card balance">
          <div className="card-icon">
            <FiDollarSign />
          </div>
          <div className="card-content">
            <span className="card-label">Net Balance</span>
            <span className={`card-value ${summary?.balance >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(summary?.balance)}
            </span>
            <span className="card-count">
              {summary?.balance >= 0 ? 'You\'re on track!' : 'Watch your spending'}
            </span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Trend Chart */}
        <div className="chart-card trend-chart">
          <div className="chart-header">
            <h3>Monthly Trends</h3>
            <Link to="/analytics" className="chart-link">
              View Details <FiArrowRight />
            </Link>
          </div>
          <div className="chart-container">
            {trends.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trends}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--text-muted)"
                    fontSize={12}
                    tickFormatter={(value) => {
                      const [year, month] = value.split('-');
                      return new Date(year, month - 1).toLocaleDateString('en-IN', { month: 'short' });
                    }}
                  />
                  <YAxis 
                    stroke="var(--text-muted)"
                    fontSize={12}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [formatCurrency(value), '']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#10b981" 
                    fill="url(#incomeGradient)"
                    strokeWidth={2}
                    name="Income"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expense" 
                    stroke="#f43f5e" 
                    fill="url(#expenseGradient)"
                    strokeWidth={2}
                    name="Expense"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">
                <p>No trend data yet. Start adding expenses!</p>
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="chart-card category-chart">
          <div className="chart-header">
            <h3>Spending by Category</h3>
          </div>
          <div className="chart-container">
            {summary?.categoryBreakdown?.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={summary.categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="total"
                    >
                      {summary.categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), '']}
                      contentStyle={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="category-legend">
                  {summary.categoryBreakdown.slice(0, 4).map((cat, index) => (
                    <div key={cat.category} className="legend-item">
                      <span 
                        className="legend-color" 
                        style={{ background: COLORS[index % COLORS.length] }}
                      ></span>
                      <span className="legend-label">
                        {CATEGORY_ICONS[cat.category]} {cat.category}
                      </span>
                      <span className="legend-value">{cat.percentage}%</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="chart-empty">
                <p>No expense data yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="recent-section">
        <div className="section-header">
          <h3>Recent Transactions</h3>
          <Link to="/expenses" className="section-link">
            View All <FiArrowRight />
          </Link>
        </div>
        
        {recentExpenses.length > 0 ? (
          <div className="transactions-list">
            {recentExpenses.map((expense) => (
              <div key={expense._id} className="transaction-item">
                <div className="transaction-icon">
                  {CATEGORY_ICONS[expense.category] || '📦'}
                </div>
                <div className="transaction-details">
                  <span className="transaction-title">{expense.title}</span>
                  <span className="transaction-category">{expense.category}</span>
                </div>
                <div className="transaction-meta">
                  <span className={`transaction-amount ${expense.type}`}>
                    {expense.type === 'income' ? '+' : '-'}
                    {formatCurrency(expense.amount)}
                  </span>
                  <span className="transaction-date">{formatDate(expense.date)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No transactions yet</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              <FiPlus /> Add Your First Expense
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={() => setShowModal(true)}>
        <FiPlus />
      </button>

      {/* Add Expense Modal */}
      {showModal && (
        <ExpenseModal
          onClose={() => setShowModal(false)}
          onSuccess={handleExpenseAdded}
        />
      )}
    </div>
  );
};

export default Dashboard;
