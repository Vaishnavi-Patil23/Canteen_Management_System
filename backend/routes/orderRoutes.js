import express from 'express';
import Order from '../models/Order.js';
const router = express.Router();

// POST route to add an order
router.post('/', async (req, res) => {
  const { items, customerName } = req.body;

  // Log received data for debugging
  console.log('Received order:', req.body);

  // Validate required fields
  if (!items || items.length === 0 || !customerName) {
    return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
  }

  try {
    const orders = await Order.insertMany(items);
    console.log('Orders added successfully:', orders); // Log successful insertion
    res.status(201).json(orders);
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

  router.get('/', async (req, res) => {
    try {
      const orders = await Order.find(); // Fetch all orders from the database
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders' });
    }
  });
  export default router;