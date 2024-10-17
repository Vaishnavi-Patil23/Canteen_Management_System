import React, { useState, useEffect } from 'react';

function App() {
  const [announcements, setAnnouncements] = useState('');
  const [isShopOpen, setIsShopOpen] = useState(true);

  // Fetch announcements and shop status from the backend
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await fetch('http://localhost:3000/announcements');
        if (!response.ok) {
          throw new Error('Failed to fetch shop data');
        }
        const data = await response.json();
        setAnnouncements(data); // Update this line
        // Assuming you have shopStatus from another API or defined elsewhere
        setIsShopOpen(true); // Adjust this based on your app logic
      } catch (error) {
        console.error('Error fetching shop data:', error);
      }
    };
    

    fetchShopData();
  }, []);

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
            The shop is currently <span style={isShopOpen ? styles.open : styles.closed}>{isShopOpen ? 'Open' : 'Closed'}</span>.
          </p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    color: '#333',
    margin: 0,
    padding: 0,
    lineHeight: '1.6',
  },
  // Home Section Styles
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

  // Vertical Announcement and Shop Status Section
  announcementStatusSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center align the cards
    padding: '20px',
  },

  // Announcement Section Styles
  announcementContainer: {
    width: '80%', // Set width for the card
    backgroundColor: '#90ee90', // Light green background for card
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
    color: '#2b472b', // Professional dark color
  },
  announcementMessage: {
    fontSize: '1.2rem',
    color: '#34495e', // Slightly lighter for contrast
  },

  // Shop Status Section Styles
  statusContainer: {
    width: '80%', // Set width for the card
    backgroundColor: '#fdfa72', // Yellow background for card
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    color: '#333',
    textAlign: 'center',
  },
  statusTitle: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#2c3e50', // Professional dark color
  },
  statusMessage: {
    fontSize: '1.3rem',
    color: '#34495e', // Slightly lighter for contrast
  },
  open: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
  closed: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
};

export default App;
