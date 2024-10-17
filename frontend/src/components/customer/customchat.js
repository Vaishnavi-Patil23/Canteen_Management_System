import React, { useState } from 'react';

const CustomerChat = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    const userId = localStorage.getItem('userId'); // Assume user ID is stored in local storage
    const response = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, message }),
    });

    if (response.ok) {
      setMessage('');
      // Optionally, fetch messages again or show a success message
    }
  };

  return (
    <div>
      <h2>Send Anonymous Message</h2>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default CustomerChat;
