import express from 'express';
import Message from '../models/Message.js'; // Adjust the path as necessary

const router = express.Router();

// Send a message
router.post('/messages', async (req, res) => {
  const { userId, message } = req.body;
  try {
    const newMessage = new Message({ userId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get all messages for owner
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Reply to a message
router.post('/messages/reply/:id', async (req, res) => {
  const { reply } = req.body;
  const { id } = req.params;

  try {
    const message = await Message.findByIdAndUpdate(id, { ownerReply: reply }, { new: true });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send reply' });
  }
});

export default router;
