import React, { useState } from 'react';

const UserProfile = () => {
  // Example user data
  const [user, setUser] = useState({
    name: "John Doe",       // Replace with dynamic user name
    role: "Customer",       // Replace with dynamic user role
    photo: "https://via.placeholder.com/150" // Replace with user photo URL
  });

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
  };

  return (
    <div style={styles.container}>
      <div style={styles.userProfile}>
        <img src={user.photo} alt="User" style={styles.userPhoto} />
        <h2 style={styles.userName}>{user.name}</h2>
        <p style={styles.userRole}>{user.role}</p>
      </div>
    </div>
  );
};

export default UserProfile;
