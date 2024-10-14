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
    // Create an array to hold the order documents
    const orders = items.map(item => ({
      itemName: item.itemName,
      price: item.price,
      quantity: item.quantity,
      totalAmount: item.totalAmount,
      status: 'pending', // default status
      customerName: customerName,
    }));

    // Insert all orders at once
    const insertedOrders = await Order.insertMany(orders);
    console.log('Orders added successfully:', insertedOrders); // Log successful insertion

    // Send response back
    res.status(201).json(insertedOrders);
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ error: 'Server error' });
    console.error('Error adding order:', error);

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
      const orders = await Order.find(); // Fetch all orders from the database
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders' });
    }
  });

  router.put('/orders/:id', async (req, res) => {
    const { status } = req.body;
    const orderId = req.params.id;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).send('Order not found');
        }
        res.send(updatedOrder);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

  
  export default router;