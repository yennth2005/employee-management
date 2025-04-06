import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>HRM</h2>
      </div>
      <div className="search-bar">
        <input type="text" className="form-control" placeholder="Search HRM..." />
      </div>
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-tachometer-alt"></i> Trang Chủ
          </NavLink>
        </li>
        <li className="nav-item">
          <div
            className="nav-link dropdown-toggle"
            onClick={() => setIsOrderOpen(!isOrderOpen)}
          >
            <i className="fas fa-users"></i> Đơn Hàng
          </div>
          {isOrderOpen && (
            <ul className="dropdown-menu show">
              <li>
                <NavLink
                  to="/employees/pending"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Chờ Xử Lý
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employees/shipped"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Đã Giao
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employees/cancelled"
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  Đã Hủy
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <NavLink
            to="/departments"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-building"></i> Phòng ban
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/positions"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-briefcase"></i> Vị Trí
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/reports"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-chart-bar"></i> Báo Cáo
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-cog"></i> Cài Đặt
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;