import React, { useState, useEffect } from 'react';

function App() {
  const [announcement, setAnnouncement] = useState('');
  const [announcementsList, setAnnouncementsList] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('http://localhost:5000/announcements');
      const data = await response.json();
      setAnnouncementsList(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handlePostAnnouncement = async () => {
    try {
      const response = await fetch('http://localhost:5000/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: announcement }),
      });
      if (response.ok) {
        setAnnouncement('');
        fetchAnnouncements(); 
      } else {
        alert('Failed to post announcement');
      }
    } catch (error) {
      console.error('Error posting announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await fetch(`http://localhost:5000/announcements/${id}`, {
        method: 'DELETE',
      });
      fetchAnnouncements(); 
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div style={styles.container}>
      <section id="home" style={styles.homeSection}>
        <div style={styles.homeContent}>
          <h1 style={styles.shopName}>Be Foodie</h1>
          <p style={styles.tagline}>Where Every Meal is a Masterpiece</p>
          <blockquote style={styles.quote}>
            "Good food is good mood."
          </blockquote>
        </div>
      </section>

      <section id="announcement-address" style={styles.announcementAddressSection}>
 
        <div style={styles.announcementContainer}>
          <h2 style={styles.announcementTitle}>Got Something to Share?</h2>
          <textarea
            placeholder="Post your announcement here..."
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            style={styles.textarea}
          />
          <button onClick={handlePostAnnouncement} style={styles.postButton}>
            Post Announcement
          </button>
        </div>

        <div style={styles.displayContainer}>
          <h2 style={styles.displayTitle}>Announcements</h2>
          {announcementsList.length === 0 ? (
            <p style={styles.noAnnouncement}>No announcements added yet.</p>
          ) : (
            <div style={styles.announcementItemsContainer}>
              {announcementsList.map((item) => (
                <div key={item._id} style={styles.announcementItem}>
                  <p>{item.text}</p>
                  <button onClick={() => handleDeleteAnnouncement(item._id)} style={styles.deleteButton}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.addressContainer}>
          <h2 style={styles.addressTitle}>Visit Us</h2>
          <p style={styles.address}>
            123 Flavor Street, Taste Town, Foodland
          </p>
          <div style={styles.addressIcon}>📍</div>
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

  announcementAddressSection: {
    padding: '80px 50px',
    backgroundColor: '#74b9ff',
    color: '#fff',
  },

  announcementContainer: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    padding: '50px',
    color: '#333',
    marginBottom: '30px',
  },
  announcementTitle: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#e84393',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '15px',
    fontSize: '1.1rem',
    borderRadius: '10px',
    border: '2px solid #74b9ff',
    marginBottom: '20px',
  },
  postButton: {
    padding: '12px 40px',
    backgroundColor: '#e84393',
    color: '#fff',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },


  displayContainer: {
    
    marginTop: '30px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    color: '#333',
  },
  displayTitle: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  noAnnouncement: {
    fontSize: '1.5rem',
    color: '#e74c3c',
    textAlign: 'center',
  },
  announcementItemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  announcementItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    flex: '1 1 45%', 
    marginRight: '10px',
  },
  deleteButton: {
    padding: '5px 15px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },

  addressContainer: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    padding: '50px',
    margin: '20px',
    color: '#333',
    position: 'relative',
  },
  addressTitle: {
    fontSize: '2.2rem',
    marginBottom: '10px',
    color: '#0984e3',
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontSize: '1.3rem',
    color: '#2d3436',
  },
  addressIcon: {
    position: 'absolute',
    fontSize: '4rem',
    top: '10px',
    right: '20px',
    color: '#0984e3',
  },
};

export default App;
