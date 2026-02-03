import React, { useState, useEffect } from 'react';
import './Analytics.css';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { toast } from 'react-toastify';
import { expensesAPI } from '../services/api';
import './Analytics.css';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6', '#ef4444', '#84cc16'];

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let params = {};
        
        if (dateRange !== 'all') {
          const now = new Date();
          const startDate = new Date();
          
          switch (dateRange) {
            case 'week':
              startDate.setDate(now.getDate() - 7);
              break;
            case 'month':
              startDate.setMonth(now.getMonth() - 1);
              break;
            case 'quarter':
              startDate.setMonth(now.getMonth() - 3);
              break;
            case 'year':
              startDate.setFullYear(now.getFullYear() - 1);
              break;
            default:
              break;
          }
          
          params = {
            startDate: startDate.toISOString(),
            endDate: now.toISOString()
          };
        }

        const [summaryRes, trendsRes] = await Promise.all([
          expensesAPI.getSummary(params),
          expensesAPI.getTrends({ months: 12 })
        ]);

        setSummary(summaryRes.data.data);
        setTrends(trendsRes.data.data);
      } catch (error) {
        toast.error('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  const savingsRate = summary?.totalIncome > 0 
    ? ((summary.balance / summary.totalIncome) * 100).toFixed(1) 
    : 0;

  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-title">
          <h1>Analytics</h1>
          <p>Insights into your spending habits</p>
        </div>
        <select 
          className="form-input form-select date-filter"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last 3 Months</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <span className="stat-label">Total Income</span>
          <span className="stat-value income">{formatCurrency(summary?.totalIncome)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Expenses</span>
          <span className="stat-value expense">{formatCurrency(summary?.totalExpense)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Net Savings</span>
          <span className={`stat-value ${summary?.balance >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(summary?.balance)}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Savings Rate</span>
          <span className={`stat-value ${savingsRate >= 20 ? 'positive' : 'neutral'}`}>
            {savingsRate}%
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Monthly Comparison */}
        <div className="chart-card full-width">
          <h3>Monthly Income vs Expenses</h3>
          <div className="chart-container">
            {trends.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trends}>
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
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">No data available</div>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="chart-card">
          <h3>Spending by Category</h3>
          <div className="chart-container">
            {summary?.categoryBreakdown?.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={summary.categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="total"
                      nameKey="category"
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
                <div className="category-list">
                  {summary.categoryBreakdown.map((cat, index) => (
                    <div key={cat.category} className="category-item">
                      <div className="category-info">
                        <span 
                          className="category-color" 
                          style={{ background: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="category-name">{cat.category}</span>
                      </div>
                      <div className="category-stats">
                        <span className="category-amount">{formatCurrency(cat.total)}</span>
                        <span className="category-percent">{cat.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="chart-empty">No expense data</div>
            )}
          </div>
        </div>

        {/* Savings Trend */}
        <div className="chart-card">
          <h3>Savings Trend</h3>
          <div className="chart-container">
            {trends.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trends.map(t => ({
                  ...t,
                  savings: (t.income || 0) - (t.expense || 0)
                }))}>
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
                    formatter={(value) => [formatCurrency(value), 'Savings']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">No data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="insights-section">
        <h3>Quick Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">📊</div>
            <div className="insight-content">
              <h4>Average Monthly Spending</h4>
              <p className="insight-value">
                {formatCurrency(summary?.totalExpense / Math.max(trends.length, 1))}
              </p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">🏆</div>
            <div className="insight-content">
              <h4>Top Spending Category</h4>
              <p className="insight-value">
                {summary?.categoryBreakdown?.[0]?.category || 'N/A'}
              </p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">💡</div>
            <div className="insight-content">
              <h4>Transactions</h4>
              <p className="insight-value">
                {(summary?.incomeCount || 0) + (summary?.expenseCount || 0)} total
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
