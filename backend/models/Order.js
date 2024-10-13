const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  customerName: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
