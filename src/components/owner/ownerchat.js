import React, { useState } from 'react';

const AnonymousChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Function to handle message submission
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, timestamp: new Date() }]);
      setInput('');
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div style={styles.chatContainer}>
      <h2 style={styles.title}>Anonymous Chat</h2>

      {/* Chat messages display */}
      <div style={styles.chatBox}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} style={styles.message}>
              <div style={styles.messageText}>{message.text}</div>
              <div style={styles.timestamp}>{message.timestamp.toLocaleTimeString()}</div>
            </div>
          ))
        ) : (
          <p style={styles.noMessages}>No messages yet...</p>
        )}
      </div>

      {/* Input and send button */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          style={styles.input}
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  chatContainer: {
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  chatBox: {
    height: '200px',
    overflowY: 'scroll',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
  },
  message: {
    padding: '5px',
    marginBottom: '5px',
    borderBottom: '1px solid #eee',
  },
  messageText: {
    fontSize: '14px',
    color: '#555',
  },
  timestamp: {
    fontSize: '10px',
    color: '#999',
    textAlign: 'right',
  },
  noMessages: {
    color: '#aaa',
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '5px',
    outline: 'none',
  },
  sendButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
  },
};

export default AnonymousChat;
