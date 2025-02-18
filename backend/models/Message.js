import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // Reference to Customer ID
  text: String,
  createdAt: { type: Date, default: Date.now }, 
});

export const Message = mongoose.model('Message', messageSchema);

