// CustomerMessaging.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const TextArea = styled.textarea`
  width: 300px;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  resize: none;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
`;

const MessageItem = styled.li`
  background-color: #f0f0f0;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

const CustomerMessaging = () => {
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  // Fetch messages when the component loads
  useEffect(() => {
    const fetchMessages = async () => {
      const userId = localStorage.getItem('userId'); // Directly get userId from localStorage
      if (!userId) {
        setError('User ID not found. Please log in.');
        return;
      }

      try {
        const response = await axios.get(`/chat/customer/${userId}`);
        setMessages(response.data);
      } catch (error) {
        setError('Error fetching messages');
      }
    };
    fetchMessages();
  }, []);

  // Send a new message
  const sendMessage = async () => {
    if (!content.trim()) {
      setError('Message content cannot be empty.');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User ID not found. Please log in.');
      return;
    }

    try {
      await axios.post('/chat/send', { userId, content }); // Send the message with userId
      setContent('');
      setError('');

      // Fetch updated messages after sending
      const updatedMessages = await axios.get(`/chat/customer/${userId}`);
      setMessages(updatedMessages.data);
    } catch (error) {
      setError('Error sending message. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Send a Message</h2>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your message"
      />
      <Button onClick={sendMessage}>Send Message</Button>
      {error && <Error>{error}</Error>}

      <h2>Your Messages</h2>
      <MessageList>
        {messages.map((message) => (
          <MessageItem key={message._id}>
            {message.content}
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </MessageItem>
        ))}
      </MessageList>
    </Container>
  );
};

export default CustomerMessaging;
