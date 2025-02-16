import express from 'express';
import Order from '../models/Order.js';
import mongoose from 'mongoose';
const router = express.Router();

router.post('/', async (req, res) => {
  const { items, customerName, userId } = req.body;
  console.log('Received order:', req.body);
  if (!items || items.length === 0 || !customerName || !userId) {
    return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
  }
  const { ObjectId } = mongoose.Types;
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid userId format.' });
  }
  try {

    const newOrder = new Order({
      items: items.map(item => ({
        itemName: item.itemName,
        price: item.price,
        quantity: item.quantity,
        totalAmount: item.totalAmount,
        status: 'pending', 
      })),
      customerName,
      userId:new ObjectId(userId), 
      createdAt: new Date(),
    });
    const savedOrder = await newOrder.save();
    console.log('Order added successfully:', savedOrder); 
    res.status(201).json({ message: 'Order added successfully', order: savedOrder });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

  router.get('/', async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders' });
    }
  });

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId.trim();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    const orders = await Order.find({ userId: new mongoose.Types.ObjectId(userId) }).select('items totalPrice status');
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/items/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { newStatus } = req.body;

  try {
    const order = await Order.findOne({  "items._id": itemId  });

      if (!order) {
          return res.status(404).json({ message: "Order not found." });
      }

      const item = order.items.find(item => item._id.toString() === itemId);
      if (!item) {
          return res.status(404).json({ message: "Item not found in this order." });
      }

      item.status = newStatus; 
      await order.save(); 

      return res.status(200).json({ message: "Status updated successfully", order });
  } catch (error) {
      return res.status(500).json({ message: "Server error", error });
  }
});

  export default router;