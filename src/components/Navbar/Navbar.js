import React from 'react';
import './Navbar.css';

function Navbar({ position, onNavigationClick }) {
  return (
    <div className={`navbar ${position}`}>
      <div className="logo">Canteen Logo</div>
      <div className="nav-links">
        <button onClick={() => onNavigationClick('home')}>Home</button>
        <button onClick={() => onNavigationClick('menu')}>Menu</button>
        <button onClick={() => onNavigationClick('your-order')}>Your Order</button>
        <button onClick={() => onNavigationClick('chat')}>Chat</button>
      </div>
    </div>
  );
}

export default Navbar;
