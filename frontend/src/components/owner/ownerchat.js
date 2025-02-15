// components/OwnerMessages.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px;
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MessageItem = styled.li`
  background-color: #e3f2fd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
`;

const OwnerMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/chat/owner');
        setMessages(response.data);
      } catch (error) {
        setError('Error fetching messages');
      }
    };
    fetchMessages();
  }, []);

  return (
    <Container>
      <h2>All Messages (Anonymous)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MessageList>
        {messages.map((message) => (
          <MessageItem key={message._id}>
            {message.content} - {new Date(message.timestamp).toLocaleString()}
          </MessageItem>
        ))}
      </MessageList>
    </Container>
  );
};

export default OwnerMessages;
