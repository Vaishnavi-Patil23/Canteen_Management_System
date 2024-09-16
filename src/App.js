import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import YourOrder from './components/YourOrder';
import Chat from './components/chat';
import './App.css'; // For custom styles

const Navigation = ({ setContentClass }) => {
  const location = useLocation();
  const [navPosition, setNavPosition] = useState('top');

  useEffect(() => {
    if (location.pathname === '/') {
      setNavPosition('top');
      setContentClass(''); // No margin for home page
    } else {
      setNavPosition('left');
      setContentClass('with-margin'); // Add margin for other pages
    }
  }, [location.pathname, setContentClass]);

  return (
    <nav className={`navbar ${navPosition}`}>
      <div className="logo">Be Foodie</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/your-order">Your Order</Link>
        <Link to="/chat">Chat</Link>
      </div>
      <div className="status-box">Open</div>
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
