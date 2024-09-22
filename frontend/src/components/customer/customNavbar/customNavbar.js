// src/components/owner/CustomNavbar.js
import React from 'react';
import './Navbar.css'; // Ensure styles are correctly applied

function CustomNavbar({ position, profileName, profileImage, userType }) {
  return (
    <div className={`navbar ${position}`}>
      <div className="logo">Be Foodie</div>
      <div className="nav-links">
        <button>Home</button>
        <button>Menu</button>
        <button>Your Order</button>
        <button>Chat</button>
      </div>
      <div className="navbar-profile">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <span className="profile-name">{profileName}</span>
          <span className="user-type">{userType}</span>
        </div>
      </div>
    </div>
  );
}

export default CustomNavbar;
