import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';


const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <ul className="dashboard-menu">
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/register">Add new Admin</Link>
          </li>
          <li>
            <Link to="/content">Create Content</Link>
          </li>
          <li>
            <Link to="/faqs">Add FAQs</Link>
          </li>
          <li>
            <Link to="/about">Add About</Link>
          </li>
          <li>
            <Link to="/team">Add Team Member</Link>
          </li>
          <li>
            <Link to="/project">Add Project</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      <div className="dashboard-content">
        {/* Nested route content will be rendered here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
