import React from 'react';
import './Navbar.css';

function Navbar({ position, onNavigationClick, profileName }) {
  return (
    <div className={`navbar ${position}`}>
      <div className="navbar-profile">
        <span className="profile-name">{profileName}</span>
      </div>
      <div className="nav-links">
        <button onClick={() => onNavigationClick('home')}>Home</button>
        <button onClick={() => onNavigationClick('menu')}>Manage Menu</button>
        <button onClick={() => onNavigationClick('your-order')}>Orders</button>
        <button onClick={() => onNavigationClick('chat')}>Chat</button>
        <button onClick={() => onNavigationClick('user')}>User</button>
      </div>
    </div>
  );
}

export default Navbar;