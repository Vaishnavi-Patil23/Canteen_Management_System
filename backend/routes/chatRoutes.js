import express from 'express';
import Message from '../models/Message.js'; // Adjust the path as necessary

const router = express.Router();

// Send a message
router.post('/send', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const newMessage = new Message({ customerId: req.user._id, content });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message, please try again later' });
  }
});

// Get messages for a specific customer
router.get('/customer/:id', async (req, res) => {
  try {
    const messages = await Message.find({ customerId: req.user._id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

// Get all messages for the owner (anonymous view)
router.get('/owner', async (req, res) => {
  try {
    const messages = await Message.find().select('content timestamp'); // Exclude customerId
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

export default router;
