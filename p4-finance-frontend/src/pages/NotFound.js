import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <FiHome /> Go Home
          </Link>
          <button 
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            <FiArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
