import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faPlane, 
  faUsers, 
  faUserTie, 
  faSignOutAlt,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="sidebar">
      <div className="logo">
        <h2>
          <FontAwesomeIcon icon={faPlane} style={{ marginRight: '10px' }} />
          StratoServe Admin
        </h2>
      </div>
      <ul className="nav-links">
        <li className={currentPath.includes('/admin/dashboard') || currentPath === '/admin' ? 'active' : ''}>
          <Link to="/admin/dashboard">
            <FontAwesomeIcon icon={faHome} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={currentPath.includes('/admin/flight-operations') ? 'active' : ''}>
          <Link to="/admin/flight-operations">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flight Operations</span>
          </Link>
        </li>
        <li className={currentPath.includes('/admin/staff-accounts') ? 'active' : ''}>
          <Link to="/admin/staff-accounts">
            <FontAwesomeIcon icon={faUsers} />
            <span>Staff Accounts</span>
          </Link>
        </li>
        <li className={currentPath.includes('/admin/passenger-profiles') ? 'active' : ''}>
          <Link to="/admin/passenger-profiles">
            <FontAwesomeIcon icon={faUserTie} />
            <span>Passenger Profiles</span>
          </Link>
        </li>
        <li className={currentPath.includes('/admin/cancellations') ? 'active' : ''}>
          <Link to="/admin/cancellations">
            <FontAwesomeIcon icon={faBan} />
            <span>Cancellations</span>
          </Link>
        </li>
      </ul>
      <div id="logout-btn">
        <Link to="/">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Log Out</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
