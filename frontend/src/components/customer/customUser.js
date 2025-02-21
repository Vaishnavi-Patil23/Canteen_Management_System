import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    role: "",
    photo: "/profile.png",
  });

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("userRole");

    if (storedUserName && storedUserRole) {
      setUser({
        name: storedUserName,
        role: storedUserRole,
        photo: "/profile.png",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    navigate("/signin");
  };

  // Enhanced UI styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "85vh",
      marginRight: "25px",
      background: "linear-gradient(to right, #f0f0f0, #e0e0e0)",
    },
    profileCard: {
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "320px",
      transition: "0.3s",
    },
    profileCardHover: {
      transform: "scale(1.02)",
      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
    },
    profilePhoto: {
      width: "110px",
      height: "110px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid #ddd",
      marginBottom: "15px",
    },
    userName: {
      fontSize: "22px",
      fontWeight: "bold",
      margin: "5px 0",
      color: "#333",
    },
    userRole: {
      fontSize: "16px",
      color: "#777",
      marginBottom: "15px",
    },
    logoutButton: {
      padding: "10px 20px",
      backgroundColor: "rgb(255, 24, 24)",
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "0.2s",
    },
    logoutButtonHover: {
      backgroundColor: "rgb(255, 72, 72)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <img src={user.photo} alt="User" style={styles.profilePhoto} />
        <h2 style={styles.userName}>{user.name || "Guest"}</h2>
        <p style={styles.userRole}>{user.role || "Unknown Role"}</p>
        <button
          style={styles.logoutButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.logoutButton.backgroundColor)}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
