import express from 'express';
import {Message} from '../models/Message.js'; // Adjust the path as necessary
const router = express.Router();

router.post("/sendMessage", async (req, res) => {
  try {
      const { customerId, text } = req.body; // Get data from request

      if (!customerId || !text) {
          return res.status(400).json({ error: "customerId and text are required" });
      }

      const newMessage = new Message({ 
        customerId:customerId , 
        text 
    });
      await newMessage.save();

      res.status(201).json({ message: "Message saved", data: newMessage });
  } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ error: "Server error" });
  }
});

router.post("/sendReply", async (req, res) => {
  const { messageId, reply } = req.body;
  await Message.findByIdAndUpdate(messageId, { reply });
  res.json({ success: true });
});

router.get("/getAllMessages", async (req, res) => {
  try {
    const messages = await Message.find().sort('timestamp');
    res.json(messages);
} catch (error) {
  console.error("Error fetching messages:", error);
  res.status(500).json({ error: "Internal Server Error" });
}
});

router.get("/getCustomerMessages/:customerId", async (req, res) => {
  try {
    const messages = await Message.find({ customerId: req.params.customerId }).sort('timestamp');
    res.json(messages);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

router.delete("/deleteMessage/:id", async (req, res) => {
  const messageId = req.params.id;

  try {
      // Delete message by its ID
      const deletedMessage = await Message.findByIdAndDelete(messageId);

      if (!deletedMessage) {
          return res.status(404).json({ message: "Message not found" });
      }

      res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ message: "Server error" });
  }
});

export default router;
