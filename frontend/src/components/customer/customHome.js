import React from 'react';
import background from '../../assets/hpage.jpg'; // Make sure the image path is correct

const Home = () => {

  const homeStyle = {

    backgroundImage: `url(${background})`, // Use template literal to inject the image URL
    backgroundSize: 'cover', // Ensure the image covers the entire page
    backgroundPosition: 'center', // Center the image
    height: '100vh', // Set height to full viewport
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center'
  };

  return (
    <div style={homeStyle}>
      {/* <h1>Welcome to Be Foodie</h1>
      <p>Enjoy our delicious menu!</p> */}
    </div>
  );
};

export default Home;
