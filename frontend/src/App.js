import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation,Navigate } from 'react-router-dom';
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
import Signin from './components/signin';
import Signup from './components/signup';
import './App.css'; // For custom styles


const Navigation = ({ setContentClass, role }) => {
  const location = useLocation();
  const [navPosition, setNavPosition] = useState('top');
  const [status, setStatus] = useState('Open');

  useEffect(() => {
    if (location.pathname === '/owner-home' ||location.pathname === '/customer-home') {
      setNavPosition('top');
      setContentClass(''); // No margin for home page
    } else {
      setNavPosition('left');
      setContentClass('with-margin'); // Add margin for other pages
    }
  }, [location.pathname, setContentClass]);

  const toggleStatus = async () => {
    try {
      // Send request to backend to toggle shop status
      const response = await fetch('http://localhost:3000/shop-status/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setStatus(data.isOpen ? 'Open' : 'Close'); // Update status based on backend response
      } else {
        console.error('Failed to toggle shop status');
      }
    } catch (error) {
      console.error('Error toggling shop status:', error);
    }
  };
  

  return (
    <nav className={`navbar ${navPosition}`}>
      <div className="logo">Be Foodie</div>
      {/* <Link to="/">Home</Link> */}
      {role === 'owner' ? (
        <>
         <Link to="/owner-home">Owner Home</Link>
          <Link to="/menu">Manage Menu</Link>
          <Link to="/your-order">Orders</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/user">User</Link>
          <div className={`status-box ${status.toLowerCase()}`} onClick={toggleStatus}>
        {status}
      </div>
        </>
      ) : (
        <>
          <Link to="/customer-home">Home</Link>
          <Link to="/customer-menu">Menu</Link>
          <Link to="/customer-orders">Your Orders</Link>
          <Link to="/customer-chat">Chat</Link>
          <Link to="/customer-user">User</Link>
        </>
      )}
      
    </nav>
  );
};

const App = () => {
  // const location = useLocation()
  const [contentClass, setContentClass] = useState('');
  const [role, setRole] = useState(null); // Track role (owner/customer)

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole'); // Get role from localStorage
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // const handleRoleSelect = (selectedRole) => {
  //   setRole(selectedRole);
  //   localStorage.setItem('userRole', selectedRole); // Save role to localStorage
  // };


  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem('userRole'); // Remove role from localStorage
    // indow.location.href = '/login';
  };

  // Show RoleSelection component if no role is set
  // if (!role) {
  //   return <RoleSelection onRoleSelect={handleRoleSelect} />;
  // }
  // const shouldShowNavbar = !(location.pathname === '/signin' || location.pathname === '/signup');
  return (
    <Router>
 { role && (
        <Navigation setContentClass={setContentClass} role={role} onLogout={handleLogout} />
      )}    
      <div className={`content ${contentClass}`}>
      <Routes>
      {/* <Route path="/" element={<Navigate to="/signin" />} /> */}
        {role === 'owner' ? (
          <>
                <Route path="/owner-home" element={<OwnerHome />} />
                <Route path="/menu" element={<OwnerMenu />} />
                <Route path="/your-order" element={<OwnerOrders />} />
                <Route path="/chat" element={<OwnerChat />} />
                <Route path="/user" element={<OwnerUser />} />
                {/* <Route path="/user" element={<OwnerUser onLogout={handleLogout} />} /> */}
              </>
            ) :role === 'customer' ? (
              <>
                <Route path="/customer-home" element={<CustomerHome />} />
                <Route path="/customer-menu" element={<CustomerMenu />} />
                <Route path="/customer-orders" element={<CustomerOrders />} />
                <Route path="/customer-chat" element={<CustomerChat />} />
                <Route path="/customer-user" element={<CustomerUser />} />
                {/* <Route path="/customer-user" element={<CustomerUser onLogout={handleLogout} />} /> */}
              </>
              ) : (
                <>
                  {/* Redirect to signin if no role is set */}
                  <Route path="/" element={<Navigate to="/signin" replace />} />
                </>
            )}
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
      </div>
    </Router>
  );
};


export default App;