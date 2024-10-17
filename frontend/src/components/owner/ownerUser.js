import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();

  // Example user data
  const [user, setUser] = useState({
    name: "Vaidik Chaudhary",       // Replace with dynamic user name
    role: "Owner",       // Replace with dynamic user role
    photo: "https://via.placeholder.com/150" // Replace with user photo URL
  });

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('userName'); // Clear user data from localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('userPhoto');
    navigate('/signin'); // Redirect to sign-in page
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center', // Center horizontally
      alignItems: 'center',     // Center vertically
      height: '100vh',          // Full viewport height
      backgroundColor: '#f0f0f0', // Light background color for contrast
    },
    userProfile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    },
    userPhoto: {
      width: '150px', // Increased size
      height: '150px', // Increased size
      borderRadius: '50%', // Circular image
      objectFit: 'cover',  // Cover the circle
    },
    userName: {
      margin: '0',
      fontSize: '24px', // Larger font size
    },
    userRole: {
      margin: '5px 0 0 0',
      color: 'gray',
      fontSize: '18px', // Larger font size
    },
    logoutButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.userProfile}>
        <img src={user.photo} alt="User" style={styles.userPhoto} />
        <h2 style={styles.userName}>{user.name}</h2>
        <p style={styles.userRole}>{user.role}</p>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
