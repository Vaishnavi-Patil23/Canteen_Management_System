import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ role,setContentClass, onLogout }) => {
  const location = useLocation();
  const [navPosition, setNavPosition] = useState("top");
  const [status, setStatus] = useState("Open");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";


  useEffect(() => {
    if (location.pathname === "/owner-home" || location.pathname === "/customer-home") {
      setNavPosition("top");
      setContentClass('');
    } else {
      setNavPosition("left");
      setContentClass('with-margin');
    }
  }, [location.pathname,setContentClass]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/shop-status`);
        if (response.ok) {
          const data = await response.json();
          setStatus(data.isOpen ? "Open" : "Close");
        }
      } catch (error) {
        console.error("Error fetching shop status:", error);
      }
    };

    fetchStatus();
  }, []);

  const toggleStatus = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/shop-status/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data.isOpen ? "Open" : "Close");
      }
    } catch (error) {
      console.error("Error toggling shop status:", error);
    }
  };

  return (
    <nav className={`navbar ${navPosition}`}>
      <div className="logo">Be Foodie</div>
      {role === "owner" ? (
        <>
          <Link to="/owner-home">Home</Link>
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

export default Navbar;
