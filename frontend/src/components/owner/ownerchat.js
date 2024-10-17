import React, { useEffect, useState } from 'react';

const OwnerChat = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('http://localhost:3000/messages');
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  const sendReply = async (messageId) => {
    await fetch(`http://localhost:3000/messages/reply/${messageId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reply }),
    });
    setReply('');
    // Optionally, refetch messages after sending a reply
  };

  return (
    <div>
      <h2>Customer Messages</h2>
      {messages.map((msg) => (
        <div key={msg._id}>
          <p><strong>Customer:</strong> {msg.message}</p>
          {msg.ownerReply && <p><strong>Owner:</strong> {msg.ownerReply}</p>}
          <textarea value={reply} onChange={(e) => setReply(e.target.value)} />
          <button onClick={() => sendReply(msg._id)}>Reply</button>
        </div>
      ))}
    </div>
  );
};

export default OwnerChat;
