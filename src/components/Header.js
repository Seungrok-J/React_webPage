import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header({ isAdmin, handleLogout, handleSettings }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="navbar-brand" to="/home" activeClassName="active-link">
              MuddyBuddy
            </NavLink>
          </div>
          <div className="navbar-nav mx-auto" style={{fontSize:'18px'}}>
            <NavLink className="nav-link" to="/home" activeClassName="active-link">My</NavLink>
            {isAdmin && (
              <NavLink className="nav-link" to="/admin" activeClassName="active-link">Admin</NavLink>
            )}
          </div>

          <div style={{ paddingRight: '20px' }}>
            <button className="btn btn-outline-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div style={{ paddingRight: '20px' }}>
            <button className="btn btn-outline-secondary" onClick={handleSettings}>
              <span className="userIcon">&#128100;</span> Settings
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
