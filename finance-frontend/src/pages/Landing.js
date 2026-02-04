import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiShield, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import './Landing.css';

const Landing = () => {
  const features = [
    {
      icon: FiTrendingUp,
      title: 'Track Expenses',
      description: 'Monitor every rupee with detailed expense tracking and categorization.'
    },
    {
      icon: FiPieChart,
      title: 'Visual Analytics',
      description: 'Beautiful charts and graphs to understand your spending patterns.'
    },
    {
      icon: FiShield,
      title: 'Secure & Private',
      description: 'Bank-level security to keep your financial data safe and encrypted.'
    }
  ];

  const benefits = [
    'Real-time expense tracking',
    'Category-based organization',
    'Income vs expense analysis',
    'Monthly trend insights',
    'Export your data anytime',
    'Dark mode support'
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="container">
          <div className="nav-brand">
            <div className="nav-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span>P4 Finance</span>
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨ Now with Dark Mode</span>
            </div>
            <h1 className="hero-title">
              Take Control of Your
              <span className="gradient-text"> Personal Finances</span>
            </h1>
            <p className="hero-subtitle">
              Track expenses, analyze spending patterns, and achieve your financial goals 
              with our intuitive and beautiful finance manager.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Start for Free <FiArrowRight />
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                Sign In
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat">
                <span className="stat-value">₹50Cr+</span>
                <span className="stat-label">Tracked</span>
              </div>
              <div className="stat">
                <span className="stat-value">4.9/5</span>
                <span className="stat-label">User Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything you need to manage money</h2>
            <p className="section-subtitle">
              Powerful features designed to help you take control of your finances
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2 className="section-title">Why choose P4 Finance?</h2>
              <p className="section-subtitle">
                Built with love by developers who understand the importance of 
                managing personal finances effectively.
              </p>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index} className="benefit-item">
                    <FiCheck className="benefit-icon" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="btn btn-primary btn-lg">
                Get Started Free <FiArrowRight />
              </Link>
            </div>
            <div className="benefits-visual">
              <div className="visual-card">
                <div className="visual-header">
                  <span className="visual-dot"></span>
                  <span className="visual-dot"></span>
                  <span className="visual-dot"></span>
                </div>
                <div className="visual-content">
                  <div className="visual-stat income">
                    <span className="label">Income</span>
                    <span className="value">₹75,000</span>
                  </div>
                  <div className="visual-stat expense">
                    <span className="label">Expense</span>
                    <span className="value">₹45,000</span>
                  </div>
                  <div className="visual-stat balance">
                    <span className="label">Balance</span>
                    <span className="value">₹30,000</span>
                  </div>
                  <div className="visual-chart">
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                    <div className="chart-bar" style={{ height: '55%' }}></div>
                    <div className="chart-bar" style={{ height: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to take control?</h2>
            <p className="cta-subtitle">
              Join thousands of users who are already managing their finances smarter.
            </p>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create Free Account <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="nav-brand">
                <div className="nav-logo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span>P4 Finance</span>
              </div>
              <p className="footer-desc">
                Your personal finance companion for smarter money management.
              </p>
            </div>
            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#support">Support</a>
              <a href="#privacy">Privacy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} P4 Finance Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
