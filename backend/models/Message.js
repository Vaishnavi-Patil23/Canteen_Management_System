import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Customer's user ID
  message: { type: String, required: true },
  ownerReply: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);
export default Message; // Use default export
