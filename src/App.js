import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/owner/ownerHome';
import Menu from './components/owner/ownerMenu';
import YourOrder from './components/owner/ownerOrders';
import Chat from './components/owner/ownerchat';
import User from './components/owner/ownerUser';
import './App.css'; // For custom styles


const Navigation = ({ setContentClass }) => {
  const location = useLocation();
  const [navPosition, setNavPosition] = useState('top');
  const [status, setStatus] = useState('Open');

  useEffect(() => {
    if (location.pathname === '/') {
      setNavPosition('top');
      setContentClass(''); // No margin for home page
    } else {
      setNavPosition('left');
      setContentClass('with-margin'); // Add margin for other pages
    }
  }, [location.pathname, setContentClass]);

  const toggleStatus = () => {
    setStatus(prevStatus => (prevStatus === 'Open' ? 'Close' : 'Open'));
  };

  return (
    <nav className={`navbar ${navPosition}`}>
      <div className="logo">Be Foodie</div>
      {/* <div className="nav-links"> */}
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/your-order">Your Order</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/user">User</Link>
        <div className={`status-box ${status.toLowerCase()}`} onClick={toggleStatus}>
        {status}
      </div>
    </nav>
  );
};

const App = () => {
  const [contentClass, setContentClass] = useState('');

  return (
    <Router>
      <Navigation setContentClass={setContentClass} />
      <div className={`content ${contentClass}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/your-order" element={<YourOrder />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;