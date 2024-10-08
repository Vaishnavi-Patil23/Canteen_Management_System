import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import OwnerHome from './components/owner/ownerHome';
import OwnerMenu from './components/owner/ownerMenu';
import OwnerOrders from './components/owner/ownerOrders';
import OwnerChat from './components/owner/ownerchat';
import OwnerUser from './components/owner/ownerUser';
import CustomerHome from './components/customer/customHome';
import CustomerMenu from './components/customer/customMenu';
import CustomerOrders from './components/customer/customOrders';
import CustomerChat from './components/customer/customchat';
import CustomerUser from './components/customer/customUser';
import RoleSelection from './components/RoleSelection'; // Import the role selection component
import './App.css'; // For custom styles


const Navigation = ({ setContentClass, role }) => {
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
      <Link to="/">Home</Link>
      {role === 'owner' ? (
        <>
          <Link to="/menu">Manage Menu</Link>
          <Link to="/your-order">Orders</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/user">User</Link>
        </>
      ) : (
        <>
          <Link to="/customer-menu">Menu</Link>
          <Link to="/customer-orders">Your Orders</Link>
          <Link to="/customer-chat">Chat</Link>
          <Link to="/customer-user">User</Link>
        </>
      )}
      <div className={`status-box ${status.toLowerCase()}`} onClick={toggleStatus}>
        {status}
      </div>
    </nav>
  );
};

const App = () => {
  const [contentClass, setContentClass] = useState('');
  const [role, setRole] = useState(null); // Track role (owner/customer)

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole'); // Get role from localStorage
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem('userRole', selectedRole); // Save role to localStorage
  };


  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem('userRole'); // Remove role from localStorage
    // navigate('/'); 
  };

  // Show RoleSelection component if no role is set
  if (!role) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }
  return (
    <Router>
    <Navigation setContentClass={setContentClass} role={role} onLogout={handleLogout} />
    <div className={`content ${contentClass}`}>
      <Routes>
        {role === 'owner' ? (
          <>
                <Route path="/" element={<OwnerHome />} />
                <Route path="/menu" element={<OwnerMenu />} />
                <Route path="/your-order" element={<OwnerOrders />} />
                <Route path="/chat" element={<OwnerChat />} />
                <Route path="/user" element={<OwnerUser />} />
                {/* <Route path="/user" element={<OwnerUser onLogout={handleLogout} />} /> */}
              </>
            ) : (
              <>
                <Route path="/" element={<CustomerHome />} />
                <Route path="/customer-menu" element={<CustomerMenu />} />
                <Route path="/customer-orders" element={<CustomerOrders />} />
                <Route path="/customer-chat" element={<CustomerChat />} />
                <Route path="/customer-user" element={<CustomerUser />} />
                {/* <Route path="/customer-user" element={<CustomerUser onLogout={handleLogout} />} /> */}
              </>
            )}
          </Routes>
      </div>
    </Router>
  );
};


export default App;
