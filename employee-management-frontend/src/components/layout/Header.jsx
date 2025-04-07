// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div className="d-flex align-items-center gap-3">
        <span>Emey Walter</span>
        <button className="btn logout-btn">
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Header;