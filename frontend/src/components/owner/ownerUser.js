import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    role: '',
    photo: 'https://via.placeholder.com/150' 
  });

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedUserRole = localStorage.getItem('userRole'); 
    const storedUserPhoto = localStorage.getItem('userPhoto'); 
    
    if (storedUserName && storedUserRole) {
      setUser({
        name: storedUserName,
        role: storedUserRole,
        photo: storedUserPhoto || 'https://via.placeholder.com/150'
      });
    }
  }, []); 


  const handleLogout = () => {
    localStorage.removeItem('userName'); 
    localStorage.removeItem('userRole');
    localStorage.removeItem('userPhoto');
    navigate('/signin'); 
  };

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
