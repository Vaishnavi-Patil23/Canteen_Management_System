import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import OwnerHome from './components/owner/ownerHome';
import OwnerMenu from './components/owner/ownerMenu';
import OwnerOrders from './components/owner/ownerOrders';
import OwnerChat from './components/owner/ownerchat';
import OwnerUser from './components/owner/ownerUser';
import Navbar from './components/owner/Navbar/Navbar';
import CustomerHome from './components/customer/customHome';
import CustomerMenu from './components/customer/customMenu';
import CustomerOrders from './components/customer/customOrders';
import CustomerChat from './components/customer/customchat';
import CustomerUser from './components/customer/customUser';
import Signin from './components/signin';
import Signup from './components/signup';
import './App.css';

const AppRoutes = ({ role, contentClass, setContentClass,handleLogout }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && role && (
        <Navbar setContentClass={setContentClass} role={role} onLogout={handleLogout} />
      )}
      <div className={`content ${hideNavbar ? "" : contentClass}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          {role === 'owner' ? (
            <>
              <Route path="/owner-home" element={<OwnerHome />} />
              <Route path="/menu" element={<OwnerMenu />} />
              <Route path="/your-order" element={<OwnerOrders />} />
              <Route path="/chat" element={<OwnerChat />} />
              <Route path="/user" element={<OwnerUser />} />
            </>
          ) : role === 'customer' ? (
            <>
              <Route path="/customer-home" element={<CustomerHome />} />
              <Route path="/customer-menu" element={<CustomerMenu />} />
              <Route path="/customer-orders" element={<CustomerOrders />} />
              <Route path="/customer-chat" element={<CustomerChat />} />
              <Route path="/customer-user" element={<CustomerUser />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/signin" replace />} />
          )}
          <Route path="*" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  const [contentClass, setContentClass] = useState('');
  const [role, setRole] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRole(null);
  };

  return (
    <Router>
      <AppRoutes role={role} contentClass={contentClass}  setContentClass={setContentClass} handleLogout={handleLogout} />
    </Router>
  );
};

export default App;
