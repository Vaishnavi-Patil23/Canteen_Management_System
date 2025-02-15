import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  items: [
    {
      itemName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
      status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending'},
    },
  ],
  customerName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to user
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);


export default Order;
