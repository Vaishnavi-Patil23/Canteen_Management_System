import React, { useState, useEffect } from 'react';

function CustomerHome() {
  const [announcements, setAnnouncements] = useState([]);
  const [isShopOpen, setIsShopOpen] = useState(true); // Tracks if the shop is open
  // const role = localStorage.getItem('userRole');

  // Fetch announcements from the backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:3000/announcements');
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Fetch the current shop status from the backend
  useEffect(() => {
    const fetchShopStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/shop-status');
        const data = await response.json();
        setIsShopOpen(data.isOpen); // Update the state based on backend response
      } catch (error) {
        console.error('Error fetching shop status:', error);
      }
    };

    fetchShopStatus();
  }, []);

  // Function to toggle the shop status (owner only)
  // const toggleShopStatus = async () => {
  //   if (role === 'owner') {
  //     try {
  //       const response = await fetch('http://localhost:3000/shop-status/toggle', { method: 'POST' });
  //       const data = await response.json();
  //       setIsShopOpen(data.isOpen); // Update UI immediately after toggling
  //     } catch (error) {
  //       console.error('Error toggling shop status:', error);
  //     }
  //   }
  // };

  return (
    <div style={styles.container}>
      {/* Home Section */}
      <section id="home" style={styles.homeSection}>
        <div style={styles.homeContent}>
          <h1 style={styles.shopName}>Be Foodie</h1>
          <p style={styles.tagline}>Where Every Meal is a Masterpiece</p>
          <blockquote style={styles.quote}>
            "Good food is good mood."
          </blockquote>
        </div>
      </section>

      {/* Announcement & Shop Status Section (Vertical Layout) */}
      <section id="announcement-status" style={styles.announcementStatusSection}>
        {/* Announcement Section */}
        <div style={styles.announcementContainer}>
          <h2 style={styles.announcementTitle}>Announcements</h2>
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <p key={index} style={styles.announcementMessage}>
                {announcement.text}
              </p>
            ))
          ) : (
            <p style={styles.announcementMessage}>No announcements available.</p>
          )}
        </div>

        {/* Shop Status */}
        <div style={styles.statusContainer}>
          <h2 style={styles.statusTitle}>Shop Status</h2>
          <p style={styles.statusMessage}>
  The shop is currently <span style={isShopOpen ? styles.open : styles.closed}>{isShopOpen ? 'Open' : 'Closed'}</span>
</p>

        </div>
      </section>
    </div>
  );
}

// CSS Styles
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    color: '#333',
    margin: 0,
    padding: 0,
    lineHeight: '1.6',
  },
  homeSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #ff6b6b, #ffcc00)',
    color: '#fff',
    textAlign: 'center',
    flexDirection: 'column',
  },
  homeContent: {
    zIndex: 2,
  },
  shopName: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#383838',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
  },
  tagline: {
    fontSize: '1.8rem',
    marginTop: '10px',
    color: '#ff9',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
  },
  quote: {
    fontStyle: 'italic',
    fontSize: '1.3rem',
    marginTop: '30px',
    color: '#ff0',
  },
  announcementStatusSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  announcementContainer: {
    width: '80%',
    backgroundColor: '#90ee90',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  announcementTitle: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#2b472b',
  },
  announcementMessage: {
    fontSize: '1.2rem',
    color: '#34495e',
  },
  statusContainer: {
    width: '80%',
    backgroundColor: '#fdfa72',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    color: '#333',
    textAlign: 'center',
  },
  statusTitle: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  statusMessage: {
    fontSize: '1.3rem',
    color: '#34495e',
  },
  open: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
  closed: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CustomerHome;
