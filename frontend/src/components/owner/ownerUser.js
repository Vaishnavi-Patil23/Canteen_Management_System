import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  
  // Set initial user state to empty
  const [user, setUser] = useState({
    name: '',
    role: '',
    photo: 'https://via.placeholder.com/150' // Default placeholder image
  });

  // Fetch user info from localStorage on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName'); // Assuming you store the user's name
    const storedUserRole = localStorage.getItem('userRole'); // Assuming you store the user's role
    const storedUserPhoto = localStorage.getItem('userPhoto'); // Optional: user's photo URL
    
    if (storedUserName && storedUserRole) {
      setUser({
        name: storedUserName,
        role: storedUserRole,
        photo: storedUserPhoto || 'https://via.placeholder.com/150'
      });
    }
  }, []); // This effect runs once when the component mounts

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
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    },
    userProfile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    },
    userPhoto: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    userName: {
      margin: '0',
      fontSize: '24px',
    },
    userRole: {
      margin: '5px 0 0 0',
      color: 'gray',
      fontSize: '18px',
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
        <h2 style={styles.userName}>{user.name || 'Guest'}</h2>
        <p style={styles.userRole}>{user.role || 'Unknown Role'}</p>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
